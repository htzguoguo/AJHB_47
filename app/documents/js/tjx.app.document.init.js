/**
 * Created by Administrator on 2016/9/30.
 */



require( [
  /*  '../../js/jq/jquery.min.js',
    '../../css/glb/bootstrap/js/bootstrap.min.js',
    '../../css/glb/bootstrap-modal/js/bootstrap-modalmanager.js',
    '../../css/glb/bootstrap-modal/js/bootstrap-modal.js',
    '../../css/glb/datatables/media/js/jquery.dataTables.min.js',
 /!*   '../../css/glb/datatables/plugins/bootstrap/dataTables.bootstrap.min.js',*!/
    '../../js/jq/jquery.cookie.js',
    '../../js/jq/jquery.blockui.min.js',
    '../../js/jq/jquery.slimscroll.min.js',*/
    '../../js/tjx.lib.min.js',
    '../../js/tjx.build.min.js',
    '../../css/glb/jstree/dist/jstree.min.js',
   /* '../../js/jq/jquery.event.gevent.js',
    '../../js/jq/jquery.event.ue.js',
    '../../js/tjx.js',
    '../../js/tjx.core.js',
    '../../js/tjx.shell.js',
    '../../js/tjx.util.js',
    '../../js/tjx.util.io.js',
    '../../js/tjx.util.ui.js',
    '../../js/tjx.util.ui.table.js',*/
    'js/tjx.data.documents.js',
    'js/tjx.app.documents.index.js',
    'js/tjx.app.documents.list.js'
], function ( $ ) {
    jQuery(document).ready(
        function () {
            tjx.shell.initModule( jQuery('body') );
            tjx.data.documents.initModule( jQuery('body') );
            tjx.app.documents.index.initModule( jQuery('body') );
            tjx.app.documents.list.initModule( jQuery('body') );
            tjx.util.hideJs( jQuery('#js') );

        });

} );
