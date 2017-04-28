(function () {
  let i = 0;
  const path = 'http://localhost:9002/api/';

  $('.submit-button').on('click', () => {
    const $usersPost = $('.users-post');
    const value = $usersPost.val();
    const user = `Andrey Khvesik version ${++i}`;
    const date = new Date();

    if (!$usersPost.val()) return
    const data = {
      body: value,
      date: date,
      user: user
    };

    $.post({
      url: `${path}addPost`,
      data: data,
      success: () => {
        addPost({value, user, date});
      }
    });

    $usersPost.val('');
  });

  $(document).on('click','.remove-button', (e) => {
    const postId = $(e.target).attr('data-id');
    if (!postId) {
      removePost($(e.target));
      return
    }
    $.ajax({
      type: 'DELETE',
      url: `${path}deletePost`,
      data: {
        id: postId
      },
      success: (response) => {
        removePost($(e.target))
      }
    })
  });

  // $('#registration-form').subm

  function addPost(options) {
    const {value, user, date} = options;
    const $newPost = $(`<div class="row post-block">
        <div class="col-xs-11 col-md-11">
          <span class="post-user">${user}</span>
          <span class="post-date">DATE: ${date}</span>
          <p class="post">${value}</p>
          </div>
         <div class="col-xs-1 col-md-1">
            <span aria-hidden="true" class="glyphicon glyphicon-remove remove-button"></span>
        </div>
       </div>`);
    $('.post-area').append($newPost)
  }

  function removePost(target) {
    console.log(target.closest('.post-block'))
    target.closest('.post-block').remove();
  }
})();