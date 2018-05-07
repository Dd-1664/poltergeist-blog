/* global maxPages */

// Code snippet inspired by https://github.com/douglasrodrigues5/ghost-blog-infinite-scroll
$(function ($) {
  var currentPage = 1;
  var pathname = window.location.pathname;
  var $document = $(document);
  var $result = $('.post-feed');
  var buffer = 300;

  var ticking = false;
  var isLoading = false;

  var lastScrollY = window.scrollY;
  var lastWindowHeight = window.innerHeight;
  var lastDocumentHeight = $document.height();

  function onScroll() {
      lastScrollY = window.scrollY;
      requestTick();
  }

  function onResize() {
      lastWindowHeight = window.innerHeight;
      lastDocumentHeight = $document.height();
      requestTick();
  }

  function requestTick() {
      if (!ticking) {
          requestAnimationFrame(infiniteScroll);
      }
      ticking = true;
  }

  function sanitizePathname(path) {
      var paginationRegex = /(?:page\/)(\d)(?:\/)$/i;

      // remove hash params from path
      path = path.replace(/#(.*)$/g, '').replace('////g', '/');

      // remove pagination from the path and replace the current pages
      // with the actual requested page. E. g. `/page/3/` indicates that
      // the user actually requested page 3, so we should request page 4
      // next, unless it's the last page already.
      if (path.match(paginationRegex)) {
          currentPage = parseInt(path.match(paginationRegex)[1]);

          path = path.replace(paginationRegex, '');
      }

      return path;
  }

  function infiniteScroll() {
      // sanitize the pathname from possible pagination or hash params
      pathname = sanitizePathname(pathname);

      // return if already loading
      if (isLoading) {
          return;
      }

      // return if not scroll to the bottom
      if (lastScrollY + lastWindowHeight <= lastDocumentHeight - buffer) {
          ticking = false;
          return;
      }

      /**
      * maxPages is defined in default.hbs and is the value
      * of the amount of pagination pages.
      * If we reached the last page or are past it,
      * we return and disable the listeners.
      */
      if (currentPage >= maxPages) {
          window.removeEventListener('scroll', onScroll, {passive: true});
          window.removeEventListener('resize', onResize);
          return;
      }

      isLoading = true;

      // next page
      currentPage += 1;

      // Load more
      var nextPage = pathname + 'page/' + currentPage + '/';

      $.get(nextPage, function (content) {
          var parse = document.createRange().createContextualFragment(content);
          var posts = parse.querySelectorAll('.post');
          if (posts.length) {
              [].forEach.call(posts, function (post) {
                  $result[0].appendChild(post);
              });
          }
      }).fail(function (xhr) {
          // 404 indicates we've run out of pages
          if (xhr.status === 404) {
              window.removeEventListener('scroll', onScroll, {passive: true});
              window.removeEventListener('resize', onResize);
          }
      }).always(function () {
          lastDocumentHeight = $document.height();
          isLoading = false;
          ticking = false;
      });
  }

  window.addEventListener('scroll', onScroll, {passive: true});
  window.addEventListener('resize', onResize);

  infiniteScroll();
});


/*jshint browser:true */
/*!
* FitVids 1.3
*
*
* Copyright 2017, Chris Coyier + Dave Rupert + Ghost Foundation
* This is an unofficial release, ported by John O'Nolan
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the MIT license
*
*/

;(function( $ ){

  'use strict';

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-container{flex-grow: 1;width:100%;}.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement("div");
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
        'object',
        'embed'
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('name')){
          var videoName = 'fitvid' + $.fn.fitVids._count;
          $this.attr('name', videoName);
          $.fn.fitVids._count++;
        }
        $this.wrap('<div class="fluid-width-video-container"><div class="fluid-width-video-wrapper"></div></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };

  // Internal counter for unique video names.
  $.fn.fitVids._count = 0;

// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );


// NOTE: Scroll performance is poor in Safari
// - this appears to be due to the events firing much more slowly in Safari.
//   Dropping the scroll event and using only a raf loop results in smoother
//   scrolling but continuous processing even when not scrolling
$(document).ready(function () {
    // Start fitVids
    var $postContent = $(".post-full-content");
    $postContent.fitVids();
    // End fitVids

    var progressBar = document.querySelector('progress');
    var header = document.querySelector('.floating-header');
    var title = document.querySelector('.post-full-title');

    var lastScrollY = window.scrollY;
    var lastWindowHeight = window.innerHeight;
    var lastDocumentHeight = $(document).height();
    var ticking = false;

    function onScroll() {
        lastScrollY = window.scrollY;
        requestTick();
    }

    function onResize() {
        lastWindowHeight = window.innerHeight;
        lastDocumentHeight = $(document).height();
        requestTick();
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(update);
        }
        ticking = true;
    }

    function update() {
        var trigger = title.getBoundingClientRect().top + window.scrollY;
        var triggerOffset = title.offsetHeight + 35;
        var progressMax = lastDocumentHeight - lastWindowHeight;

        // show/hide floating header
        if (lastScrollY >= trigger + triggerOffset) {
            header.classList.add('floating-active');
        } else {
            header.classList.remove('floating-active');
        }

        progressBar.setAttribute('max', progressMax);
        progressBar.setAttribute('value', lastScrollY);

        ticking = false;
    }

    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onResize, false);

    update();

});