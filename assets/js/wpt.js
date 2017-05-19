jQuery(document).ready(function($) {

  var updateRowVisibility = function() {
    var selectedFilter = $('#label-filter').val()
    var tabs = $('#fluidtable__tabs li');
    var activeListId = 'list_' + tabs.index(tabs.filter('.active'));

    $('.fluidtable__row').each(function() {
      var labels = $(this).attr('data-labels').split(",");
      var rowListId = $(this).attr('data-list-id');

      // Show the row if it has the selected label and its in the active tab
      if (labels.includes(selectedFilter) && rowListId == activeListId) {
        $(this).show();
      }
      else {
        $(this).hide();
      }
    })
  }

  $('#label-filter').on('change', function () {
    updateRowVisibility();
  });

  $(document).on("shown.bs.tab", function(e) {
    updateRowVisibility();
  });

  updateRowVisibility();
});