/*var raster = new ol.layer.Tile({
  source: new ol.source.MapQuestOpenAerial()
});*/

var vector = new ol.layer.Vector({
  id: 'vector',
  source: new ol.source.Vector({
    parser: new ol.parser.GeoJSON(),
    url: 'data/maakond2.geojson'
  }),
  style: new ol.style.Style({
    rules: [
      new ol.style.Rule({
        filter: 'renderIntent("selected")',
        symbolizers: [
          new ol.style.Fill({
            color: '#0066dd',
            opacity: 0.3
          }),
          new ol.style.Stroke({
            color: '#000066',
            width: 6
          }),
          new ol.style.Stroke({
            color: '#0066dd',
            width: 3
          })
        ]
      }),
      new ol.style.Rule({
        filter: 'renderIntent("temporary")',
        symbolizers: [
          new ol.style.Shape({
            fill: new ol.style.Fill({
              color: '#000066',
              opacity: 1
            }),
            size: 18
          })
        ]
      }),
      new ol.style.Rule({
        filter: 'renderIntent("future")',
        symbolizers: [
          new ol.style.Shape({
            fill: new ol.style.Fill({
              color: '#0066dd',
              opacity: 1
            }),
            size: 18
          })
        ]
      })
    ],
    symbolizers: [
     new ol.style.Fill({
            color: '#fff',
            opacity: 0.6
          }),  
    new ol.style.Stroke({
        color: '#000000',
        width: 5
      }),
      new ol.style.Stroke({
        color: '#ffffff',
        width: 2.5
      })
    ]
  })
});

var selectInteraction = new ol.interaction.Select({
  layerFilter: function(layer) { return layer.get('id') == 'vector'; }
});

var projection = new ol.proj.Projection({
  code: 'EPSG:3301',
  units: ol.proj.Units.METERS
});

var map = new ol.Map({
  interactions: ol.interaction.defaults().extend(
      [selectInteraction, new ol.interaction.Modify()]),
  layers: [vector],
  renderer: ol.RendererHint.CANVAS,
  target: 'map',
  view: new ol.View2D({
    center: [591151, 6509832],
    projection: projection,
    //center: [-11000000, 4600000],
    zoom: 8
  })
});

console.log(gj);
var o;
var div;
for(var i in gj.features){
    div = document.createElement('div');
    div.innerHTML = gj.features[i].properties.mnimi;
    div.setAttribute('class', 'overlay');
    div.style.fontSize = 'small';
    div.style.marginLeft = '-50%';
    div.style.overflow = 'visible';
    
    o = new ol.Overlay({
      position: gj.features[i].geometry.coordinates,
      positioning: ol.OverlayPositioning.CENTER_LEFT,
      element: div
    });
    map.addOverlay(o);
}

    
