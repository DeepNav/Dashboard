gauge_instances = {};
(function (gauge_instances) {
    class Compass {
        constructor(config) {
            this.imagePath = config.imagePath || "images/compass.png";
            this.renderTo = config.renderTo
            this.imageWidth = config.imageWidth || 250
            this.imageHeight = config.imageHeight || 250
            this.image = $("<image src='" + this.imagePath + "' >")
            this.image.css({
                width: this.imageWidth,
                height: this.imageHeight,
                transition: "all 0.5s"
            })
        }
        set value(val) {
            this.image.css('transform', 'rotate(' + val + 'deg)');
        }
        draw() {
            $("#" + this.renderTo).append(this.image)
        }
        set(val) {
            this.value = val
        }
    }
    var compass_meta = {}
    var gauge_config = {
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

    var gauges_configs = [
        {
            id: "throttle",
            type: Gauge,
            meta: Object.assign({}, gauge_config, {
                minValue: -1,
                maxValue: 1
            }),
            default_val: 0
        },
        {
            id: "direction",
            type: Gauge,
            meta: Object.assign({}, gauge_config, {
                minValue: 0,
                maxValue: 180,
                colorStart: '#E0E0E0',
                colorStop: '#E0E0E0'
            }),
            default_val: 90
        },
        {
            id: "compass_bearing",
            type: Compass,
            meta: compass_meta,
            default_val: 0
        },
        {
            id: "wind_direction",
            type: Compass,
            meta: compass_meta,
            default_val: 0
        },
        {
            id: "heading",
            type: Compass,
            meta: compass_meta,
            default_val: 0
        }
    ]

    gauges_configs.forEach(function (gauge_config) {
        if (gauge_config.type == Compass) {
            gauge_config.meta.renderTo = gauge_config.id;
            var gauge = new Compass(gauge_config.meta);
            gauge.draw();
            gauge_instances[gauge_config.id] = gauge;
        } else {
            var target = document.getElementById(gauge_config.id);
            var gauge = new Gauge(target).setOptions(gauge_config.meta);
            gauge.maxValue = gauge_config.meta.maxValue;
            gauge.setMinValue(gauge_config.meta.minValue)
            gauge_instances[gauge_config.id] = gauge;
        }
        gauge.set(gauge_config.default_val)
    })
})(gauge_instances)