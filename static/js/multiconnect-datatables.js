(function() {
    // Definizione della funzione initializeDataTable
    window.initializeDataTable = function(selector, hiddenColumns) {
        $(selector).DataTable({
            responsive: true,
            language: {
                url: "/static/js/multiconnect-datatables.json"
            },
            dom: '<"top"fBl>rt<"bottom"pi><"clear">',
            buttons: ['colvis','print'],
            autoWidth: true, // Abilita la dimensione automatica delle colonne
            columnDefs: [
                {
                    targets: hiddenColumns, // Indici colonne da nascondere
                    visible: false
                }
            ],
            deferLoading: 0, // La tabella parte vuota
            searching: true, // Abilita la ricerca
            keys: true,
            drawCallback: function(settings) {
                var api = this.api();
                var pagination = $(api.table().container()).find('.dt-paging');
                if (api.page.info().pages <= 1) {
                    pagination.css('display', 'none');
                } else {
                    pagination.css('display', 'block');
                }
                var info = $(api.table().container()).find('.dt-info');
                if (api.search() === "") {
                    info.css('display', 'none');
                } else {
                    info.css('display', 'block');
                }
            }
        });
    };
})();
