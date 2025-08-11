import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import Post from 'flarum/forum/components/Post';
import CommentPost from 'flarum/forum/components/CommentPost';
import Button from 'flarum/common/components/Button';
import DiscussionComposer from 'flarum/forum/components/DiscussionComposer';
import ReplyComposer from 'flarum/forum/components/ReplyComposer';
import PostControls from 'flarum/forum/utils/PostControls';

app.initializers.add('zhihe-restricted-posts', () => {
  // Add restricted post badges to header items (inline in post header)
  extend(CommentPost.prototype, 'headerItems', function (items) {
    const post = this.attrs.post;
    
    if (post && post.attribute('isRestricted')) {
      items.add('restrictedBadge',
        m('span', {
          className: 'RestrictedBadge',
          title: app.translator.trans('zhihe-restricted-posts.forum.restricted_post')
        }, 
          m('i', { className: 'fas fa-lock' })
        ),
        70  // Between primaryBadge (80) and meta (0), right edge of Post-header
      );
    }
  });

  // Add mark/unmark controls to post dropdown menu (like Edit/Delete)
  extend(PostControls, 'userControls', function (items, post, context) {
    const user = app.session.user;

    // Show mark/unmark controls only for post author
    if (user && user.id() === post.user().id()) {
      if (post.attribute('isRestricted')) {
        items.add('unmarkRestricted',
          Button.component({
            icon: 'fas fa-unlock',
            onclick: () => {
              context.unmarkAsRestricted();
            }
          }, app.translator.trans('zhihe-restricted-posts.forum.unmark_restricted')),
          90
        );
      } else {
        items.add('markRestricted',
          Button.component({
            icon: 'fas fa-lock',
            onclick: () => {
              context.markAsRestricted();
            }
          }, app.translator.trans('zhihe-restricted-posts.forum.mark_restricted')),
          90
        );
      }
    }
  });

  // Add mark/unmark methods to Post prototype
  extend(Post.prototype, 'oninit', function () {
    this.markAsRestricted = () => {
      const post = this.attrs.post;
      
      app.request({
        method: 'POST',
        url: app.forum.attribute('apiUrl') + '/posts/' + post.id() + '/mark-restricted'
      }).then(() => {
        post.pushAttributes({ isRestricted: true });
        m.redraw();
      }).catch(error => {
        console.error('Failed to mark post as restricted:', error);
      });
    };

    this.unmarkAsRestricted = () => {
      const post = this.attrs.post;
      
      app.request({
        method: 'DELETE',
        url: app.forum.attribute('apiUrl') + '/posts/' + post.id() + '/unmark-restricted'
      }).then(() => {
        post.pushAttributes({ isRestricted: false });
        m.redraw();
      }).catch(error => {
        console.error('Failed to unmark post as restricted:', error);
      });
    };
  });

  // Add "Mark as Restricted" checkbox to Discussion Composer
  extend(DiscussionComposer.prototype, 'headerItems', function (items) {
    items.add('isRestricted',
      m('div', { className: 'Form-group' }, [
        m('label', { className: 'checkbox' }, [
          m('input', {
            type: 'checkbox',
            checked: this.composer.fields.isRestricted || false,
            onchange: (e) => {
              this.composer.fields.isRestricted = e.target.checked;
            }
          }),
          ' ',
          app.translator.trans('zhihe-restricted-posts.forum.restricted_checkbox')
        ])
      ]),
      10
    );
  });

  // Add "Mark as Restricted" checkbox to Reply Composer
  extend(ReplyComposer.prototype, 'headerItems', function (items) {
    items.add('isRestricted',
      m('div', { className: 'Form-group' }, [
        m('label', { className: 'checkbox' }, [
          m('input', {
            type: 'checkbox',
            checked: this.composer.fields.isRestricted || false,
            onchange: (e) => {
              this.composer.fields.isRestricted = e.target.checked;
            }
          }),
          ' ',
          app.translator.trans('zhihe-restricted-posts.forum.restricted_checkbox')
        ])
      ]),
      10
    );
  });

  // Add isRestricted to discussion creation data
  extend(DiscussionComposer.prototype, 'data', function (data) {
    data.isRestricted = this.composer.fields.isRestricted || false;
  });

  // Add isRestricted to reply creation data
  extend(ReplyComposer.prototype, 'data', function (data) {
    data.isRestricted = this.composer.fields.isRestricted || false;
  });
});