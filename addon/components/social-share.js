import Ember from 'ember';
import layout from '../templates/components/social-share';

export default Ember.Component.extend({
  layout: layout,

	// URLS
	facebookBasedUrl: "https://www.facebook.com/sharer/sharer.php?u=%@&title=%@",
	pinterestBasedUrl: "https://www.pinterest.com/pin/create/button/?url=%@&media=%@&description=%@&w=380&h=270",
	twitterBasedUrl: "http://twitter.com/share?url=%@&amp;text=%@",
	plusBasedUrl: "https://plus.google.com/share?url=%@",

	// Data
	shareMedia: Ember.computed('media', function() {
    return encodeURIComponent(this.get('media'));
  }),

	sharURL: Ember.computed('url', function() {
    return encodeURIComponent(window.location.href);
  }),

	shareDescription: Ember.computed('description', function() {
    return encodeURIComponent(this.get('description')).replace(/'/g,'%27');
  }),

	shareTitle: Ember.computed('title', function() {
    return encodeURIComponent(this.get('title'));
  }),

  pinterestUrl: Ember.computed('pinterestBasedUrl', {
    get() {
    	return Ember.String.fmt(this.get('pinterestBasedUrl'), [this.get('sharURL'),this.get('shareMedia'),this.get('shareDescription')]);
    }
  }),

  facebookUrl: Ember.computed('facebookBasedUrl', {
    get() {
    	return Ember.String.fmt(this.get('facebookBasedUrl'), [this.get('sharURL'),this.get('shareTitle')]);
    }
  }),

  twitterUrl: Ember.computed('twitterBasedUrl', {
    get() {
    	return Ember.String.fmt(this.get('twitterBasedUrl'), [this.get('sharURL'),this.get('shareDescription')]);
    }
  }),

  plusUrl: Ember.computed('plusBasedUrl', {
    get() {
    	return Ember.String.fmt(this.get('plusBasedUrl'), [this.get('sharURL')]);
    }
  }),

  facebookPopUpOptions: Ember.computed('window.screen.width,window.screen.height', {
    get() {
    	return this._popUpOptions(550,450);
    }
  }),
  pinterestPopUpOptions: Ember.computed('window.screen.width,window.screen.height', {
    get() {
    	return this._popUpOptions(700,300);
    }
  }),

  twitterPopUpOptions: Ember.computed('window.screen.width,window.screen.height', {
    get() {
    	return this._popUpOptions(548,280);
    }
  }),

  plusPopUpOptions: Ember.computed('window.screen.width,window.screen.height', {
    get() {
    	return this._popUpOptions(550,590);
    }
  }),

  _popUpOptions: function(width,height) {
    	var left = (window.screen.width / 2) - ((width / 2)) - 200,
    			top = (window.screen.height / 2) - ((height / 2)) - 150;
    	return "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" +
    					left + ",top=" + top + ",screenX=" + left + ",screenY="+ top +
    					",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
  }

});
