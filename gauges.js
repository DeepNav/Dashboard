gauge_instances = {};
(function (gauge_instances) {

    var compass_meta = {
        width: 200,
        height: 200,
        minValue: 0,
        maxValue: 360,
        majorTicks: [
            "N",
            "NE",
            "E",
            "SE",
            "S",
            "SW",
            "W",
            "NW",
            "N"
        ],
        minorTicks: 22,
        ticksAngle: 360,
        startAngle: 180,
        strokeTicks: false,
        highlights: false,
        colorPlate: "#a33",
        colorMajorTicks: "#f5f5f5",
        colorMinorTicks: "#ddd",
        colorNumbers: "#ccc",
        colorNeedle: "rgba(240, 128, 128, 1)",
        colorNeedleEnd: "rgba(255, 160, 122, .9)",
        valueBox: false,
        valueTextShadow: false,
        colorCircleInner: "#fff",
        colorNeedleCircleOuter: "#ccc",
        needleCircleSize: 15,
        needleCircleOuter: false,
        animationRule: "linear",
        needleType: "line",
        needleStart: 75,
        needleEnd: 99,
        needleWidth: 3,
        borders: true,
        borderInnerWidth: 0,
        borderMiddleWidth: 0,
        borderOuterWidth: 10,
        colorBorderOuter: "#ccc",
        colorBorderOuterEnd: "#ccc",
        colorNeedleShadowDown: "#222",
        borderShadowWidth: 0,
        animationTarget: "plate",
        value: 0,
        animateOnInit: true
    }

    var gauges_configs = [
        {
            id: "throttle",
            type: Gauge,
            meta: {
                angle: 0,
                lineWidth: 0.41,
                radiusScale: 1,
                pointer: {
                    length: 0.56,
                    strokeWidth: 0.035,
                    color: '#000000'
                },
                limitMax: false,
                limitMin: false,
                colorStart: '#6FADCF',
                colorStop: '#8FC0DA',
                strokeColor: '#E0E0E0',
                generateGradient: true,
                highDpiSupport: true,
                minValue: -1,
                maxValue: 1,
                animationSpeed: 32
            }
        },
        {
            id: "direction",
            type: Gauge,
            meta: {
                angle: 0,
                lineWidth: 0.41,
                radiusScale: 1,
                pointer: {
                    length: 0.56,
                    strokeWidth: 0.035,
                    color: '#000000'
                },
                limitMax: false,
                limitMin: false,
                colorStart: '#E0E0E0',
                colorStop: '#E0E0E0',
                strokeColor: '#E0E0E0',
                generateGradient: true,
                highDpiSupport: true,
                minValue: 0,
                maxValue: 180,
                animationSpeed: 32
            }
        },
        {
            id: "compass",
            type: RadialGauge,
            meta: compass_meta
        },
        {
            id: "wind_direction",
            type: RadialGauge,
            meta: compass_meta
        },
        {
            id: "heading",
            type: RadialGauge,
            meta: compass_meta
        }
    ]

    gauges_configs.forEach(function (gauge_config) {
        if (gauge_config.type == RadialGauge) {
            gauge_config.meta.renderTo = gauge_config.id;
            var gauge = new RadialGauge(gauge_config.meta);
            gauge.draw();
            gauge_instances[gauge_config.id] = gauge;
            gauge.dv_update = function (val) {
                gauge.value = val
            }
        } else {
            var target = document.getElementById(gauge_config.id);
            var gauge = new Gauge(target).setOptions(gauge_config.meta);
            gauge.maxValue = gauge_config.meta.maxValue;
            gauge.setMinValue(gauge_config.meta.minValue)
            gauge_instances[gauge_config.id] = gauge;
            gauge.dv_update = function (val) {
                gauge.set(val)
            }
        }
    })
})(gauge_instances)