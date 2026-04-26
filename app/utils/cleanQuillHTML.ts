/**
 * Helper function to clean Quill editor HTML
 * - Removes Quill UI spans
 * - Fixes links to be external with proper protocols
 * - Processes lists (ordered/bullet) in correct order
 * - Preserves formatting (bold, italic, underline)
 * - Preserves spaces and line breaks
 */
export const cleanQuillHTML = (html: string): string => {
  if (!html) return '';
  
  // Remove quill's UI spans only
  let cleaned = html.replace(/<span class="ql-ui"[^>]*><\/span>/g, '');
  
  // Fix links to ensure they open externally with proper protocols
  cleaned = cleaned.replace(/<a\s+([^>]*)>/g, (match, attrs) => {
    // Check if href exists in attributes
    let hrefMatch = attrs.match(/href="([^"]+)"/);
    if (hrefMatch) {
      let href = hrefMatch[1];
      
      // If href doesn't start with http:// or https://, add https://
      if (!href.startsWith('http://') && !href.startsWith('https://')) {
        href = 'https://' + href;
        // Replace the href in attrs
        attrs = attrs.replace(/href="[^"]+"/, `href="${href}"`);
      }
    }
    
    // Add target="_blank" and rel="noopener noreferrer" for external links
    if (!attrs.includes('target="_blank"')) {
      attrs += ' target="_blank"';
    }
    if (!attrs.includes('rel=')) {
      attrs += ' rel="noopener noreferrer"';
    }
    
    return `<a ${attrs}>`;
  });
  
  // Process the HTML in order, preserving the sequence
  const elementRegex = /<(ol|ul|p|div)([^>]*)>([\s\S]*?)<\/\1>/g;
  const elements: Array<{ tag: string; attrs: string; content: string }> = [];
  let match;
  
  // Collect all elements in order
  while ((match = elementRegex.exec(cleaned)) !== null) {
    elements.push({
      tag: match[1],
      attrs: match[2],
      content: match[3]
    });
  }
  
  // If no elements found with regex, return cleaned
  if (elements.length === 0) {
    return cleaned;
  }
  
  // Process each element in order
  let result = '';
  
  for (const element of elements) {
    if (element.tag === 'ol' || element.tag === 'ul') {
      // Process list - check for mixed types inside
      const hasOrderedItems = element.content.includes('data-list="ordered"');
      const hasBulletItems = element.content.includes('data-list="bullet"');
      
      if (hasOrderedItems && hasBulletItems) {
        // Separate mixed lists
        const liRegex = /<li\s*data-list="([^"]+)"[^>]*>([\s\S]*?)<\/li>/g;
        const orderedItems: string[] = [];
        const bulletItems: string[] = [];
        let liMatch;
        
        while ((liMatch = liRegex.exec(element.content)) !== null) {
          const type = liMatch[1];
          const content = liMatch[2];
          
          if (type === 'ordered') {
            orderedItems.push(content);
          } else if (type === 'bullet') {
            bulletItems.push(content);
          }
        }
        
        // Add ordered list if has items
        if (orderedItems.length > 0) {
          result += '<ol class="resume-list">';
          orderedItems.forEach(item => {
            result += `<li>${item}</li>`;
          });
          result += '</ol>';
        }
        
        // Add bullet list if has items
        if (bulletItems.length > 0) {
          result += '<ul class="resume-list">';
          bulletItems.forEach(item => {
            result += `<li>${item}</li>`;
          });
          result += '</ul>';
        }
      } else if (hasBulletItems) {
        // All bullet items
        const liRegex = /<li\s*data-list="bullet"[^>]*>([\s\S]*?)<\/li>/g;
        const bulletItems: string[] = [];
        let liMatch;
        
        while ((liMatch = liRegex.exec(element.content)) !== null) {
          bulletItems.push(liMatch[1]);
        }
        
        if (bulletItems.length > 0) {
          result += '<ul class="resume-list">';
          bulletItems.forEach(item => {
            result += `<li>${item}</li>`;
          });
          result += '</ul>';
        }
      } else if (hasOrderedItems) {
        // All ordered items
        const liRegex = /<li\s*data-list="ordered"[^>]*>([\s\S]*?)<\/li>/g;
        const orderedItems: string[] = [];
        let liMatch;
        
        while ((liMatch = liRegex.exec(element.content)) !== null) {
          orderedItems.push(liMatch[1]);
        }
        
        if (orderedItems.length > 0) {
          result += '<ol class="resume-list">';
          orderedItems.forEach(item => {
            result += `<li>${item}</li>`;
          });
          result += '</ol>';
        }
      } else {
        // Regular list without data-list attributes
        result += `<${element.tag} class="resume-list">${element.content}</${element.tag}>`;
      }
    } 
    
     else if (element.tag === 'p') {
  // Handle paragraph - preserve formatting, links, and line breaks
  let content = element.content;
  
  // Process any links inside the content that might have been missed
  content = content.replace(/<a\s+([^>]*)>/g, (linkMatch, linkAttrs) => {
    let hrefMatch = linkAttrs.match(/href="([^"]+)"/);
    if (hrefMatch) {
      let href = hrefMatch[1];
      if (!href.startsWith('http://') && !href.startsWith('https://')) {
        href = 'https://' + href;
        linkAttrs = linkAttrs.replace(/href="[^"]+"/, `href="${href}"`);
      }
    }
    if (!linkAttrs.includes('target="_blank"')) {
      linkAttrs += ' target="_blank"';
    }
    if (!linkAttrs.includes('rel=')) {
      linkAttrs += ' rel="noopener noreferrer"';
    }
    return `<a ${linkAttrs}>`;
  });
  
  // Preserve leading/trailing spaces by converting to &nbsp;
  if (content !== '' && content !== '<br>' && content !== '<br/>') {
    // Replace leading spaces
    content = content.replace(/^ +/, (match) => '&nbsp;'.repeat(match.length));
    // Replace trailing spaces
    content = content.replace(/ +$/, (match) => '&nbsp;'.repeat(match.length));
    // Replace multiple spaces within text (optional - to preserve all spaces)
    content = content.replace(/ {2,}/g, (match) => '&nbsp;'.repeat(match.length));
  }
  
  // Don't remove empty paragraphs that contain <br>
  if (content === '<br>' || content === '<br/>') {
    result += '<p><br></p>';
  } else if (content !== '' || content.includes('<a')) {
    // Preserve all formatting tags including links AND spaces
    result += `<p>${content}</p>`;
  }
}

     else {
      // Handle other elements (div, etc.)
      result += `<${element.tag}${element.attrs ? ' ' + element.attrs : ''}>${element.content}</${element.tag}>`;
    }
  }
  
  // Clean up any remaining data-list attributes
  result = result.replace(/data-list="[^"]+"/g, '');
  
  // Add styles for links
  result = result.replace(/<a /g, '<a style="color: #0077b5; text-decoration: underline; cursor: pointer;" ');
  
  return result;
};