$(document).ready(function() {

    $.getScript('https://raw.githubusercontent.com/matkomat/bookmarklets/master/pdf417-js-master/bcmath-min.js', function() {
        $.getScript('https://raw.githubusercontent.com/matkomat/bookmarklets/master/pdf417-js-master/pdf417-min.js', function() {
            var drawBarCode = function (opis) {
                var document = window.document.getElementById('invoiceIframe').contentDocument;
                var container = document.getElementById('barcode');
                if (!container) {
                    $td = $('body > div.hub > table > tbody > tr > td', document);
                    $td.append($('<div id=barcode style="position:absolute;top:212px;left:10px"></div>'));
                    container = document.getElementById('barcode');
                }
                PDF417.init(opis);             

                var barcode = PDF417.getBarcodeArray();

                // block sizes (width and height) in pixels
                var bw = 1;
                var bh = 1;

                // create canvas element based on number of columns and rows in barcode
                if (container.firstChild) container.removeChild(container.firstChild);

                var canvas = document.createElement('canvas');
                canvas.width = bw * barcode['num_cols'];
                canvas.height = bh * barcode['num_rows'];
                container.appendChild(canvas);
                $(canvas).attr('title', opis);

                var ctx = canvas.getContext('2d');                    

                // graph barcode elements
                var y = 0;
                // for each row
                for (var r = 0; r < barcode['num_rows']; ++r) {
                    var x = 0;
                    // for each column
                    for (var c = 0; c < barcode['num_cols']; ++c) {
                        if (barcode['bcode'][r][c] == 1) {                        
                            ctx.fillRect(x, y, bw, bh);
                        }
                        x += bw;
                    }
                    y += bh;
                }           

            };



            var $ifrBody = $('#invoiceIframe').contents();

            var platiteljSve = $ifrBody.find('body > div.hub > table > tbody > tr > td > div:nth-child(23)').html().replace(/<br>/g,',').replace(/<span>/,'').replace(/<\/span>/,'')
            var platiteljArray = platiteljSve.split(',');
            var platitelj=platiteljArray[0].replace(/^\s+|\s+$/g,'');
            var adresaPlatitelja = platiteljArray[1].replace(/^\s+|\s+$/g,'');
            var gradPlatitelja = platiteljArray[2].replace(/^\s+|\s+$/g,'');


            var primateljElementi = $ifrBody.find('body > div.hub > table > tbody > tr > td > div:nth-child(28) > span').html().replace(/<br>/g,',').replace(/&nbsp;/g,' ').split(',');
            var primateljIme='', primateljAdresa='', primateljGrad='';
            if (primateljElementi.length = 3) {
              primateljIme = primateljElementi[0].replace(/^\s+|\s+$/g,'');
              primateljAdresa = primateljElementi[1].replace(/^\s+|\s+$/g,'');
              primateljGrad = primateljElementi[2].replace(/^\s+|\s+$/g,'');
            } else {
              primateljIme = primateljElementi.join(',');
            }

            var iban = $ifrBody.find('body > div.hub > table > tbody > tr > td > div:nth-child(26) > span').text().replace(/^\s+|\s+$/g,'');
            var pozivNaBroj = $ifrBody.find('body > div.hub > table > tbody > tr > td > div:nth-child(20) > span').text().replace(/^\s+|\s+$/g,'');
            var model = $ifrBody.find('body > div.hub > table > tbody > tr > td > div:nth-child(21) > span').text().replace(/^\s+|\s+$/g,'');
            var opis = $ifrBody.find('body > div.hub > table > tbody > tr > td > div:nth-child(30) > span').text().replace(/&nbsp;/g,' ').replace(/^\s+|\s+$/g,'');

            var iznos = $ifrBody.find('body > div.hub > table > tbody > tr > td > div:nth-child(18) > span').text().replace(/^\s+|\s+$/g,'');
            iznos = iznos.replace(/,/,'');
            iznos = iznos.replace(/\./,'');

            var out = 'HRVHUB30';
            out += '\n';
            out += 'HRK';
            out += '\n';
            out += iznos;
            out += '\n';
            out += platitelj;
            out += '\n';
            out += adresaPlatitelja;
            out += '\n';
            out += gradPlatitelja;
            out += '\n';
            out += primateljIme;
            out += '\n';
            out += primateljAdresa;
            out += '\n';
            out += primateljGrad;
            out += '\n';
            out += iban;
            out += '\n';
            out += model;
            out += '\n';
            out += pozivNaBroj;
            out += '\n';
            out += 'COST';
            out += '\n';
            out += opis;

            drawBarCode(out);

        });
    });
});
