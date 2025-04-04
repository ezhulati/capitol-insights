/**
 * DOM Purify - Simple JS utility for sanitizing HTML content
 * ES5-compatible version for maximum browser compatibility
 */
(function(window) {
  'use strict';

  // List of allowed HTML tags
  var ALLOWED_TAGS = [
    'a', 'b', 'br', 'code', 'div', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'i', 'li', 'ol', 'p', 'pre', 'span', 'strong', 'table', 'tbody', 'td', 
    'th', 'thead', 'tr', 'ul'
  ];

  // List of allowed attributes
  var ALLOWED_ATTRS = [
    'class', 'href', 'id', 'style', 'target', 'title', 'rel'
  ];

  // URL protocols that are allowed
  var ALLOWED_PROTOCOLS = [
    'http:', 'https:', 'mailto:', 'tel:'
  ];

  /**
   * Checks if a value exists in an array using indexOf (ES5 compatible)
   * @param {Array} arr - The array to check
   * @param {*} value - The value to look for
   * @return {boolean} True if the value is in the array
   */
  function arrayIncludes(arr, value) {
    return arr.indexOf(value) !== -1;
  }

  /**
   * Check if a URL has a safe protocol
   * @param {string} url - URL to check
   * @return {boolean} True if URL has a safe protocol
   */
  function hasSafeProtocol(url) {
    try {
      var protocol = new URL(url).protocol;
      return arrayIncludes(ALLOWED_PROTOCOLS, protocol);
    } catch (e) {
      // If URL parsing fails, reject the URL
      return false;
    }
  }

  /**
   * Creates a new DOM element from an HTML string
   * @param {string} html - HTML string to convert to DOM
   * @return {HTMLElement} A DOM element containing the converted HTML
   */
  function createElementFromHTML(html) {
    var div = document.createElement('div');
    div.innerHTML = html.trim();
    return div;
  }

  /**
   * Sanitize an HTML string by removing disallowed tags and attributes
   * @param {string} html - The HTML string to sanitize
   * @return {string} The sanitized HTML
   */
  function sanitizeHTML(html) {
    if (!html || typeof html !== 'string') {
      return '';
    }

    // Create a DOM element from the HTML string
    var container = createElementFromHTML(html);
    
    // Process all elements recursively
    sanitizeNode(container);
    
    // Return the sanitized HTML
    return container.innerHTML;
  }

  /**
   * Recursively sanitize a DOM node and its children
   * @param {Node} node - The node to sanitize
   */
  function sanitizeNode(node) {
    // Get all child nodes as a static array (since we'll be modifying the tree)
    var childNodes = Array.prototype.slice.call(node.childNodes);
    
    // Process each child node
    for (var i = 0; i < childNodes.length; i++) {
      var child = childNodes[i];
      
      // Handle element nodes
      if (child.nodeType === 1) { // ELEMENT_NODE
        var tagName = child.nodeName.toLowerCase();
        
        // Remove disallowed tags
        if (!arrayIncludes(ALLOWED_TAGS, tagName)) {
          node.removeChild(child);
          continue;
        }
        
        // Filter attributes
        var attributes = Array.prototype.slice.call(child.attributes);
        for (var j = 0; j < attributes.length; j++) {
          var attr = attributes[j];
          var attrName = attr.name.toLowerCase();
          
          // Remove disallowed attributes
          if (!arrayIncludes(ALLOWED_ATTRS, attrName)) {
            child.removeAttribute(attrName);
          }
          
          // Special handling for href attributes
          if (attrName === 'href') {
            var url = attr.value;
            if (!hasSafeProtocol(url)) {
              child.removeAttribute('href');
            }
          }
        }
        
        // Recursively process this element's children
        sanitizeNode(child);
      }
      // Handle text nodes - do nothing
      else if (child.nodeType === 3) { // TEXT_NODE
        continue;
      }
      // Remove all other node types (comments, CDATA, etc.)
      else {
        node.removeChild(child);
      }
    }
  }

  // Expose the sanitizeHTML function globally
  window.DOMPurify = {
    sanitize: sanitizeHTML
  };

})(window);
