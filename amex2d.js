$(document).ready(function() {

    $.getScript('https://raw.githubusercontent.com/matkomat/bookmarklets/master/pdf417-js-master/bcmath-min.js', function() {
        $.getScript('https://raw.githubusercontent.com/matkomat/bookmarklets/master/pdf417-js-master/pdf417-min.js', function() {

            var $a = $('body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(4) > td.leftbg > table > tbody > tr:nth-child(1) > td > table:nth-child(2) > tbody > tr:nth-child(1) > td > span > a:nth-child(2)');
            var oc = $a.attr('onclick');

            if (oc) {
                $a.removeAttr('onclick');
                $a.data('_onclick', oc);
            } else {
                oc = $a.data('_onclick');
            }

            var drawBarCode = function (opis, dospijece) {
                var container = document.getElementById('barcode');
                if (!container) {
                    $td = $('body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(4) > td.leftbg > table > tbody > tr:nth-child(1) > td > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(1)');
                    $('<td><div id=barcode></div></td>').insertAfter($td);
                    container = document.getElementById('barcode');
                }


                        PDF417.init(opis);             

                        var barcode = PDF417.getBarcodeArray();

                        // block sizes (width and height) in pixels
                        var bw = 2;
                        var bh = 2;

                        // create canvas element based on number of columns and rows in barcode
                        if (container.firstChild) container.removeChild(container.firstChild);

                        var canvas = document.createElement('canvas');
                        canvas.width = bw * barcode['num_cols'];
                        canvas.height = bh * barcode['num_rows'];
                        container.appendChild(canvas);
                        $(canvas).attr('title', opis);
                        $('<div id=dospijece>'+dospijece+'</div>').insertAfter($(canvas));

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

            $a.unbind('click').click(function(e){
                var win;
                eval('win='+oc);
                e.stopPropagation();
                $(win).load(function() {

                  var platitelj = $('body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(4) > td.leftbg > table > tbody > tr:nth-child(1) > td > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(1) > strong > div:nth-child(2) > strong').text().replace(/^\s+|\s+$/g,'');
                  var adresaPlatitelja = $('body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(4) > td.leftbg > table > tbody > tr:nth-child(1) > td > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(1) > strong > div:nth-child(3)').text().replace(/^\s+|\s+$/g,'');
                  var gradPlatitelja = $('body > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(4) > td.leftbg > table > tbody > tr:nth-child(1) > td > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(1) > strong > div:nth-child(4)').text().replace(/^\s+|\s+$/g,'');


                  var primateljElementi = $('body > table > tbody > tr:nth-child(3) > td > span', win.document).text().split(',');
                  var primateljIme='', primateljAdresa='';
                  if (primateljElementi.length = 2) {
                      primateljIme = primateljElementi[0].replace(/^\s+|\s+$/g,'');
                      primateljAdresa = primateljElementi[1].replace(/^\s+|\s+$/g,'');
                  } else {
                      primateljIme = primateljElementi.join(',');
                  }
                  var iban = $('body > table > tbody > tr:nth-child(5) > td > span', win.document).first().text().replace(/ /g,'');
                  var pozivNaBroj = $('body > table > tbody > tr:nth-child(7) > td', win.document).text().replace(/^\s+|\s+$/g,'');
                  var model = $('body > table > tbody > tr:nth-child(9) > td', win.document).text().replace(/^\s+|\s+$/g,'');
                  var opis = $('body > table > tbody > tr:nth-child(11) > td', win.document).text().replace(/^\s+|\s+$/g,'');
                  var dospijece = $('body > table > tbody > tr:nth-child(13) > td      ', win.document).text().replace(/^\s+|\s+$/g,'');
                  var iznos = $('td:contains("Saldo za obračun")').last().next().text();
                  if (!iznos) {
                      iznos = $('body > table > tbody > tr:nth-child(15) > td', win.document).text().replace(/^\s+|\s+$/g,'');
                  }
                  iznos = iznos.replace(/ kn$/,'');
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
                  out += '\n';
                  out += iban;
                  out += '\n';
                  out += 'HR'+model;
                  out += '\n';
                  out += pozivNaBroj;
                  out += '\n';
                  out += 'CDBL';
                  out += '\n';
                  out += opis;

                  drawBarCode(out, dospijece);

                  win.close();
                });
                return false;
            });

            $a.click();
        });
    });        

});
