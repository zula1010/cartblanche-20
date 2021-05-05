// re-check every 250 ms to see if job has completed
const UPDATE_INTERVAL_MS = 250;

var mouseover = new MouseOver('arthor_img_popup');
var hit_count_od;
var draw;
var dtable = null;
var fromSmiInput = false;

function get_smiles_parts(smiles) {
  var split = smiles.length;
  for (var i = 0; i < smiles.length; i++) {
    if (smiles[i] == '\t' || smiles[i] == ' ') {
      split = i;
      if (smiles[i + 1] != '|' || smiles[i - 1] == '|')
        break;
    }
  }
  return [smiles.substring(0, split), smiles.substring(split + 1)];
}

$(document).ready(function () {
  hit_count_od = new Odometer({
    el: document.querySelector('#hit_count'),
    value: 0,

    // Any option (other than auto and selector) can be passed in here
    format: '(,ddd)',
    theme: 'default'
  });
});

function updateTotal(request) {
  $.ajax({
    url: arthor.url + '/dt/' + arthor.table + '/search',
    type: "GET",
    data: {
      query: request.query,
      type: request.type,
      draw: request.draw,
      start: request.start,
      length: request.length,
      flags: arthor.flags
    }
  })
    .done(function (response) {
      if (response.draw === draw) {
        if (response.hasMore) {
          setTimeout(function () { updateTotal(request); },
            UPDATE_INTERVAL_MS);
        } else {
          $('#res-panel').removeClass("waiting");
          hit_count_od.update(response.recordsTotal);
          if (arthor.type === 'Similarity')
            $('#search_type').html("Scored and ranked");
          else
            $('#search_type').html("Matched");
          $('#search_time').html(response.time);
          dtable.draw('page');
        }
      }
    });
}

function fetchPage(request) {
  var deferred = new $.Deferred();
  var backup = jQuery.extend({}, arthor, request);
  draw = backup.draw;
  $.ajax({
    url: arthor.url + '/dt/' + arthor.table + '/search',
    type: "GET",
    data: {
      query: arthor.query,
      type: arthor.type,
      draw: request.draw,
      start: request.start,
      length: request.length,
      flags: arthor.flags,
      columns: request.columns
    }
  })
    .done(function (response) {
      if (response.draw === draw) {
        arthor.queryResponse = response.query;
        if (!response.hasMore && arthor.time === null) {
          arthor.time = response.time;
          hit_count_od.update(response.recordsTotal);
          if (arthor.type === 'Similarity')
            $('#search_type').html("Scored and ranked");
          else
            $('#search_type').html("Matched");
          $('#search_time').html(arthor.time);
          $('#res-panel').removeClass("waiting");
        } else if (response.hasMore) {
          setTimeout(function () {
            updateTotal(backup);
          }, UPDATE_INTERVAL_MS);
        }
        deferred.resolve(response);
      }
    })
    .fail(function (error) {
      deferred.fail(error);
    });
  return deferred.promise();
}

function redraw() {

  if (!arthor.query || !arthor.table)
    return;

  if (!arthor.time)
    $('#res-panel').addClass("waiting");

  var table = $('#results');
  if (!dtable) {
    $('#splash').css('display', 'none');
    var columns = [{
      "title": "#",
      "class": "editop",
      "width": "75px",
      "render": hitid_renderer,
      "sortable": false
    },
    {
      "title": "Compound",
      "name": "alignment",
      "class": "compound",
      "width": "450px",
      "sortable": false,
      "type": "html",
      "render": smiles_renderer
    },
    {
      "title": "Score",
      "name": "sim",
      "render": flex_renderer,
      "sortable": false
    }];
    dtable = table.DataTable({
      "columns": columns,
      "destroy": true,
      "serverSide": true,
      "autoWidth": true,
      "info": false,
      "filter": true,
      "ajax": function (request, callback, settings) {
        fetchPage(request).done(function (response) {
          callback(response);
        });
      },
      "dom": 'rtpi',
      "scrollX": true,
      "scrollY": (function () {
        return $('#res-panel').height() - $('#res-head').height() - 10;
      })(),
      "deferRender": false,
      "scroller": {
        "rowHeight": 100,
        "loadingIndicator": false,
        "serverWait": 100,
        "displayBuffer": 10
      },
      "order": []
    });
  } else {
    dtable.draw('page');
  }
}

/* Column Rendering */

function flex_renderer(data, type, row) {
  if (typeof data === "number")
    return data.toFixed(2);
  else
    return data;
}

function hitid_renderer(data, type, row) {
  // console.log(data)
  return (data + 1).toLocaleString();
}

function show_popup(e, url) {
  mouseover.show(url, e.pageX, e.pageY);
}

function move_popup(e) {
  mouseover.move(e.pageX, e.pageY);
}

function drag_img(event, smiles) {
  mouseover.hide();
  var url = arthor.config.WebApp.RESOLVER.replace("%s", encodeURIComponent(smiles));
  $.ajax({
    async: false,
    type: 'GET',
    url: url,
    success: function (data) {
      event.dataTransfer.setData("text", data);
    }
  });
}

function smiles_renderer(data, type, row) {

  var table = $("<table class='compound_cell'></table>");
  var img = $('<img width="200px" height="100px" />');

  var depict_url = arthor.getHitImg(data, 200, 100);
  var popup_url = arthor.getHitImg(data, 350, 200);

  var parts = get_smiles_parts(data);

  img.attr('src', depict_url);
  img.attr('onmouseenter', 'show_popup(event, "' + popup_url + '");');
  img.attr('onmousemove', 'move_popup(event);');
  img.attr('onmouseleave', 'mouseover.hide();');
  img.attr('ondragstart', 'drag_img(event, "' + parts[0] + '");');

  var $info = $("<table>");
  var id = parts[1];
  var href;
  if (arthor.tables[arthor.table].urlFormatStr)
    href = arthor.tables[arthor.table].urlFormatStr.replace("%s", id);

  if (href) {
    $info.append(
      $('<tr>').append(
        $('<td>').append("<b><a target='_blank' href='" + href + "'>" + id + "</a></b>")));
  } else {
    $info.append(
      $('<tr>').append(
        $('<td>').append("<b>" + id + "</b>")));
  }

  try {
    var parser = new Parser(data);
    if (parser.parse()) {
      $info.append(
        $('<tr>').append(
          $('<td>').append(parser.mf(true))));
      $info.append(
        $('<tr>').append(
          $('<td>').append(parser.mw())));
    }
  } catch (err) {
    console.log(err);
  }
  let button = $('<button type="button" class="btn btn-info">Add to Cart</button>')
  button.attr('id', id);
  button.attr('data-identifier', id);
  button.attr('data-db', arthor.table);
  button.attr('data-hg', false);
  button.attr('data-img', depict_url);
  button.attr('onclick', 'toggleCart(this)');
  let cart = JSON.parse(localStorage.getItem('cart'))
  let items = []
  for (i = 0; i < cart.length; i++) {
    items.push(cart[i].identifier)
  }
  if (items.includes(id)) {
    button.html('Remove')
    button.attr('class', 'btn btn-danger')
  }

  var row = $('<tr></tr>');
  row.append($("<td></td>").append(button))
  row.append($("<td class=\"compound_cell_img\" style='width: 220px;'></td>").append(img));
  row.append($("<td></td>").append($info));
  table.append(row);

  return $('<div>').append(table)
    .html();
}
// function toggleCart(btn) {
//   let cart = JSON.parse(localStorage.getItem('cart'))
//   if (btn.getAttribute('class') == 'btn btn-info') {
//     let item = {
//       'identifier': btn.id,
//       'db': btn.getAttribute('db'),
//       'img': btn.getAttribute('img'),
//       'supplier': []
//     }
//     cart.push(item)
//     localStorage.setItem('cart', JSON.stringify(cart))
//     $(btn).html('Remove')
//     $(btn).attr('class', 'btn btn-danger')
//     $('#cartCount').html(cart.length)
//     if (localStorage.getItem('is_authenticated') === 'True') {
//       console.log('add')
//       $.ajax({
//         type: 'POST',
//         url: '/addToCart',
//         data: JSON.stringify({
//           'id': btn.id,
//           'database': btn.getAttribute('db'),
//           'img_url': btn.getAttribute('img')
//         }),
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         success: function (result) {
//           console.log('db saved: ' + btn.id)
//         },
//         error: function (data) {
//           alert("fail when adding to server molecule:" + btn.id);
//         }
//       });
//     }


//   }
//   else {
//     for (i = 0; i < cart.length; i++) {
//       if (cart[i].identifier == btn.id) {
//         cart.pop(i)
//       }
//     }
//     localStorage.setItem('cart', JSON.stringify(cart))
//     $(btn).html('Add To Cart')
//     $(btn).attr('class', 'btn btn-info')
//     $('#cartCount').html(cart.length)
//     if (localStorage.getItem('is_authenticated') === 'True') {
//       console.log('delete')
//       $.ajax({
//         url: '/deleteItem/' + btn.id,
//         type: 'DELETE',
//         success: function (result) {
//           console.log('db deleted: ' + btn.id)
//         }
//       });
//     }


//   }
//   return false;
// }