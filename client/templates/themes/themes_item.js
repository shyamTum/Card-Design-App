Template.companyItem.rendered = function () {
  $(".thumbnail")
      .mouseenter(function () {
        $(this).find('.caption').removeClass("fadeOutUp").addClass("fadeInDown").show();
      })
      .mouseleave(function () {
        $(this).find('.caption').removeClass("fadeInDown").addClass("fadeOutUp");
      });
}