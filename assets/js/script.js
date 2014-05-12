/*global $:false, window:false, console:false */
/*
 *  ImCoder
 *
 *  Made by Davidson Fellipe - fellipe.com
 *  Under MIT License
 */

var ImCoder = function (config) {

    "use strict";

    this.text = null;

    this.index = 0;

    this.lettersByTyping = 5;

    this.lineBreak = '<br><span class="im-coder-line"></span>';
    this.tab = '&nbsp;&nbsp;';

    var that = this;

    this.reset();

    setInterval(function() {
        that.blinkCursor();
    }, 500);

    this.bind();
};

ImCoder.prototype.reset = function () {

    this.text = null;

    this.index = 0;

    $('#im-coder-editor').html('<span class="im-coder-line"></span>');

    $('#im-coder-editor').removeClass('im-coder-editing');

};

ImCoder.prototype.bind = function () {

    var that = this;

    $(document).keydown(
        function(event) {

            if(event.which !== 27){
                that.addText(event);
            } else {
                $('#im-coder-sidebar').show();
                that.reset();
            }
        }
    );

    $('.im-coder-lang').click(function() {

            var lang = 'langs/' + $(this).text() + '.txt';

            $.get(lang, function(data) {
                that.text = '\n' + data;
            });

            $('#im-coder-sidebar').hide();

        }
    );

    $('.im-coder-paste').bind('paste blur', function() {

          var element = this;

          setTimeout(function () {

            that.text = $(element).val();


            $('#im-coder-sidebar').fadeOut('slow');

          }, 100);

    });

};

ImCoder.prototype.content = function () {
    return $('#im-coder-editor').html();
};

ImCoder.prototype.addText = function () {
    if (this.text) {

        var words = this.content();

        if (words.substring(words.length - 1, words.length) === '|') {
            $('#im-coder-editor').html($('#im-coder-editor')
                .html()
                .substring(0, words.length - 1));
        }

        this.index += this.lettersByTyping;
        
        var isFirstLine = this.index <= this.lettersByTyping ? '' : '<br>';

        var text = $('<div/>')
            .text(this.text.substring(0, this.index))
            .html();

        var newLine = new RegExp('\n', 'g');

        var newTab = new RegExp('\\t', 'g');

        $('#im-coder-editor').html(
            text.replace(newLine, this.lineBreak)
            .replace(newTab, this.tab)
        );

        if(isFirstLine) {
            $('#im-coder-editor').addClass('im-coder-editing');
        }

        window.scrollBy(0, 150);
    }
};

ImCoder.prototype.blinkCursor = function () {

    var words = this.content();

    if (words.substring(words.length - 1, words.length) === '|') {

        $('#im-coder-editor').html($('#im-coder-editor')
            .html()
            .substring(0, words.length - 1));

    } else {

        $('#im-coder-editor').append('|');

    }

};

$(function($){

    new ImCoder();

});