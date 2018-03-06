// function pdfToHTML() {
//     var pdf = new jsPDF('p', 'pt', 'letter');
//     source = $('#contentPdf')[0];
//     specialElementHandlers = {
//         '#bypassme': function(element, renderer) {
//             return true
//         }
//     }
//     margins = {
//         top: 50,
//         left: 60,
//         width: 545
//     };
//     pdf.fromHTML(
//             source // HTML string or DOM elem ref.
//             , margins.left // x coord
//             , margins.top // y coord
//             , {
//                 'width': margins.width // max width of content on PDF
//                     ,
//                 'elementHandlers': specialElementHandlers
//             },
//             function(dispose) {
//                 // dispose: object with X, Y of the last line add to the PDF
//                 //          this allow the insertion of new lines after html
//                 pdf.save('MonRecu.pdf');
//             }
//         )
//         // alert("It s me !!");
// }

function pdfToHTML() {

    var pdf = new jsPDF('p', 'pt', 'letter');

    source = $('#contentPdf')[0];

    specialElementHandlers = {

        '#bypassme': function(element, renderer) {

            return true

        }

    }

    margins = {

        top: 50,

        left: 60,

        width: 200,

        height: 500

    };

    pdf.fromHTML(

        source // HTML string or DOM elem ref.

        , margins.left // x coord

        , margins.top // y coord

        , {

            'width': margins.width // max width of content on PDF

            ,
            'elementHandlers': specialElementHandlers

        }

        ,
        function(dispose) {

            // dispose: object with X, Y of the last line add to the PDF

            // this allow the insertion of new lines after html

            // pdf.save('MonRecu.pdf');

            // pdf.output('dataurl');// Works Perfectly In Firefox

            var uri = pdf.output('dataurlstring');

            openDataUriWindow(uri);

        }

    )

    // alert("It s me !!");

}

function openDataUriWindow(url) {

    var html = '<html>' +

        '<style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;} </style>' +

        '<body>' +

        '<iframe src="' + url + '"></iframe>' +

        '</body></html>';

    a = window.open();

    a.document.write(html);

}


function pdfToHTML1() {
    var pdf = new jsPDF('p', 'pt', 'letter');
    source = $('#allInvoices')[0];
    specialElementHandlers = {
        '#bypassme': function(element, renderer) {
            return true
        }
    }
    margins = {
        top: 50,
        left: 60,
        width: 545
    };
    pdf.fromHTML(
            source // HTML string or DOM elem ref.
            , margins.left // x coord
            , margins.top // y coord
            , {
                'width': margins.width // max width of content on PDF
                    ,
                'elementHandlers': specialElementHandlers
            },
            function(dispose) {
                // dispose: object with X, Y of the last line add to the PDF
                //          this allow the insertion of new lines after html
                pdf.save('MonRecu.pdf');
            }
        )
        // alert("It s me !!");
}