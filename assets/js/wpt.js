jQuery(document).ready(function($) {

  var updateRowVisibility = function() {
    var selectedFilter = $('#label-filter').val();
    var tabs = $('#fluidtable__tabs li');
    var activeListId = 'list_' + tabs.index(tabs.filter('.active'));

    $('.fluidtable__row').each(function() {
      var labels = $(this).attr('data-labels').split(",");
      var rowListId = $(this).attr('data-list-id');

      // Show the row if it has the selected label and its in the active tab
      if (selectedFilter !== '' && labels.includes(selectedFilter) && rowListId == activeListId) {
        $(this).show();
      }
      // Show all in the active tab if filter was not selected
      else if(selectedFilter === '' && rowListId == activeListId) {
        $(this).show();
      }
      else {
        $(this).hide();
      }
    });
  };

  $('.nav-link--roadmap').on('click', function() {
    $('.fluidtable__body').css('opacity', 0);
    $list = $(this).attr('data-toggle');
    $(this).parent().parent().find('.active').removeClass('active');
    $(this).parent().addClass('active');
    setTimeout(function() {
      $('.fluidtable__row').css('display', 'none');
      $('.fluidtable__row[data-list-id="'+$list+'"]').removeAttr('style');
    }, 150);

    setTimeout(function() {
      $('.fluidtable__body').css('opacity', 1);
      updateRowVisibility();
    }, 150);
  });

  $('#label-filter').on('change', function () {
    updateRowVisibility();
  });

  updateRowVisibility();
});