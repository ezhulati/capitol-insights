/**
 * DOM Purify - Minimal sanitization utility for Capitol Insights HTML documents
 * This is a simplified implementation focused on preventing XSS attacks in HTML content
 */

(function (global, factory) {
  // UMD pattern to support different environments
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.DOMPurify = factory());
}(this, function() {
  'use strict';

  const DOMPurify = {
    /**
     * Sanitizes HTML string to prevent XSS attacks
     * @param {string} dirty - The untrusted HTML to sanitize
     * @param {Object} config - Optional configuration 
     * @returns {string} - Sanitized HTML
     */
    sanitize: function(dirty, config) {
      if (!dirty) {
        return '';
      }
      
      // Default configuration
      const cfg = Object.assign({
        ALLOWED_TAGS: [
          'a', 'b', 'br', 'div', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'i', 'li', 'ol', 'p', 'span', 'strong', 'table', 'tbody', 'td',
          'th', 'thead', 'tr', 'ul'
        ],
        ALLOWED_ATTR: [
          'class', 'href', 'id', 'style', 'target', 'title', 'aria-*', 'role',
          'tabindex', 'scope'
        ],
        ALLOW_DATA_ATTR: false
      }, config || {});
      
      // Create a temporary document fragment to work with
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = dirty;
      
      // Remove potentially dangerous elements
      this._sanitizeNode(tempDiv, cfg);
      
      // Return the sanitized HTML
      return tempDiv.innerHTML;
    },
    
    /**
     * Recursively sanitizes DOM nodes
     * @private
     */
    _sanitizeNode: function(node, cfg) {
      // Get all elements including the root 
      const elementsToCheck = Array.prototype.slice.call(node.getElementsByTagName('*'));
      if (node.nodeType === 1) { // Element node
        elementsToCheck.unshift(node);
      }
      
      // Process each element
      elementsToCheck.forEach(element => {
        // Check if tag is allowed
        const tagName = element.tagName.toLowerCase();
        if (!cfg.ALLOWED_TAGS.includes(tagName)) {
          if (element.parentNode) {
            element.parentNode.removeChild(element);
          }
          return; // Skip further processing
        }
        
        // Check and sanitize attributes
        const attributesToRemove = [];
        for (let i = 0; i < element.attributes.length; i++) {
          const attr = element.attributes[i];
          const attrName = attr.name.toLowerCase();
          
          // Check if attribute is allowed
          let isAllowed = false;
          for (let j = 0; j < cfg.ALLOWED_ATTR.length; j++) {
            const allowedAttr = cfg.ALLOWED_ATTR[j];
            if ((allowedAttr.indexOf('-*') === allowedAttr.length - 2) && 
                attrName.indexOf(allowedAttr.substring(0, allowedAttr.length - 2)) === 0) {
              isAllowed = true;
              break;
            }
            if (allowedAttr === attrName) {
              isAllowed = true;
              break;
            }
          }
          
          // Check data attributes
          const isDataAttr = attrName.indexOf('data-') === 0;
          if (!isAllowed && !(isDataAttr && cfg.ALLOW_DATA_ATTR)) {
            attributesToRemove.push(attrName);
            continue;
          }
          
          // Sanitize URLs in href attributes
          if (attrName === 'href') {
            const value = attr.value.trim().toLowerCase();
            if (value.indexOf('javascript:') === 0 || value.indexOf('data:') === 0) {
              attributesToRemove.push(attrName);
              continue;
            }
          }
        }
        
        // Remove disallowed attributes
        attributesToRemove.forEach(attr => {
          element.removeAttribute(attr);
        });
      });
    }
  };
  
  // Public API
  return {
    sanitize: function(dirty, config) {
      return DOMPurify.sanitize(dirty, config);
    },
    version: '1.0.0'
  };
}));
