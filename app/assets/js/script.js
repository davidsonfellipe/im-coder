/*global jQuery:false, window:false */
/*
 *  ImCoder
 *
 *  Made by Davidson Fellipe - fellipe.com
 *  Under MIT License
 */
(function ($) {
    'use strict';

    var ImCoder = function () {

        this.text = null;

        this.index = 0;

        this.lettersByTyping = 5;

        this.lineBreak = '<br><span class="im-coder-line"></span>';

        var that = this;

        this.reset();

        setInterval(function () {
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

        $(document).bind('keydown touchstart',
            function (event) {

                if(!$(event.target).hasClass('im-coder-characters')) {
                    if (event.which !== 27) {
                        if (event.which === 8) {
                            event.preventDefault();
                            that.removeText(event);
                        }
                        else {
                            that.addText(event);
                        }
                    } else {

                        $('#im-coder-sidebar').show();

                        that.reset();
                    }
                }
            }
        );

        $('.im-coder-lang').click(function () {

            var codeLang = $(this).data('syntax-lang');

            var lang = 'langs/' + codeLang + '.txt';
            
            that.lettersByTyping = that.getLettersByTyping();

            $.get(lang, function(data) {
                that.text = that.setText(data);
            });

            $('#im-coder-sidebar').hide();
        });

        $('#im-coder-paste').bind('paste blur', function () {

            var element = this;

            setTimeout(function () {

                that.text = that.setText($(element).val());

                that.lettersByTyping = that.getLettersByTyping();

                $('#im-coder-sidebar').fadeOut('slow');

            }, 100);

        });

    };

    ImCoder.prototype.getLettersByTyping = function ()  {
        var lettersByTyping = $('#im-coder-characters').val();
        //Checking if the value exists and upper limit of 100 and assign
        return lettersByTyping && lettersByTyping <= 100 ? parseInt(lettersByTyping) : 5
    };

    ImCoder.prototype.setText = function (text)  {
        return ( this.text = '\n' + text );
    };

    ImCoder.prototype.content = function () {
        return $('#im-coder-editor').html();
    };

    ImCoder.prototype.addText = function () {
        if (this.text) {

            var words = this.content();
            var code = '';

            if (words.charAt(words.length - 1) === '|') {
                $('#im-coder-editor').html($('#im-coder-editor')
                    .html()
                    .substring(0, words.length - 1));
            }

            if (this.index <= this.lettersByTyping) {
                $('#im-coder-editor').addClass('im-coder-editing');
            }

            // if the user press backspace repeatedly, this.index will become more and more negative, but 0 should be the limit.
            if (this.index < 0) {
                this.index = 0;
            }

            this.index += this.lettersByTyping;

            var text = this.text.substring(0, this.index);

            code = hljs.highlightAuto(text).value;

            var codeChunk = code.replace(/\n/g, this.lineBreak);

            $('#im-coder-editor').html(codeChunk);

            window.scrollBy(0, 150);
        }
    };

    ImCoder.prototype.removeText = function() {
        if (this.text) {

            var words = this.content();
            var code = '';

            if (words.charAt(words.length - 1) === '|') {
                $('#im-coder-editor').html($('#im-coder-editor')
                    .html()
                    .substring(0, words.length - 1));
            }

            // if the user press any key other than backspacek repeatedly, this.index will become too big, when it should be at most the size of the code
            if (this.index > this.text.length) {
                this.index = this.text.length - (this.text.length % this.lettersByTyping);
            }
            else {
                this.index -= this.lettersByTyping;
            }

            var text = this.text.substring(0, this.index);

            code = hljs.highlightAuto(text).value;

            var codeChunk = code.replace(/\n/g, this.lineBreak);
            if (codeChunk === '') {
                $('#im-coder-editor').html(this.lineBreak);
            }
            else {
                $('#im-coder-editor').html(codeChunk);
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

    new ImCoder();

})(jQuery);
