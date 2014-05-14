/*global jQuery:false, window:false */
/*
 *  ImCoder
 *
 *  Made by Davidson Fellipe - fellipe.com
 *  Under MIT License
 */
(function ($) {
    'use strict';

    var codeLang;

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

        $(document).keydown(
            function (event) {

                if (event.which !== 27) {

                    that.addText(event);

                } else {

                    $('#im-coder-sidebar').show();

                    that.reset();

                }
            }
        );

        $('.im-coder-lang').click(function () {
            codeLang = $(this).text();
            var lang = 'langs/' + codeLang + '.txt';

            $.get(lang, function(data) {
                that.text = that.setText(data);
            });
            
            $('#im-coder-sidebar').hide();
        });

        $('.im-coder-paste').bind('paste blur', function () {

            var element = this;

            setTimeout(function () {

                that.text = that.setText($(element).val());

                $('#im-coder-sidebar').fadeOut('slow');

            }, 100);

        });

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

            if (words.substring(words.length - 1, words.length) === '|') {
                $('#im-coder-editor').html($('#im-coder-editor')
                    .html()
                    .substring(0, words.length - 1));
            }

            if (this.index <= this.lettersByTyping) {
                $('#im-coder-editor').addClass('im-coder-editing');
            }

            this.index += this.lettersByTyping;

            var text = this.text.substring(0,this.index);

            var highlighted = hljs.highlight(codeLang, text).value;

            var codeChunk = highlighted.replace(/\n/g, this.lineBreak);

            $('#im-coder-editor').html(codeChunk);

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
