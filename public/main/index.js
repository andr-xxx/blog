(function () {
  let i = 0;
  const path = 'http://localhost:9002/api/';

  $('.submit-button').on('click', () => {
    const $usersPost = $('.users-post')
    if (!$usersPost.val()) return
    const data = {
      body: $usersPost.val(),
      date: new Date(),
      user: `Andrey Khvesik version ${++i}`
    };

    $.post({
      url: `${path}addPost`,
      data: data
    });

    $usersPost.val('');
  });

  $('.remove-button').on('click', (e) => {
    const postId = $(e.target).closest('.post-block').find('.post-id').text();

    $.ajax({
      type: 'DELETE',
      url: `${path}deletePost`,
      data: {
        id: postId
      },
    })
  })

  $('#registration-form').subm
})();