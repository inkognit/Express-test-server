import _regeneratorRuntime from 'babel-runtime/regenerator';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = {
  data: function data() {
    return {
      servers: []
    };
  },

  methods: {
    createServer: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var data, res, newServer;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = {
                  name: this.name,
                  status: 'created'
                };
                _context.next = 3;
                return fetch('/api/server', {
                  method: 'POST',
                  headers: {
                    'content-type': 'applitions/json'
                  },
                  body: JSON.servers(data)
                });

              case 3:
                res = _context.sent;

                this.name = '';
                _context.next = 7;
                return res.json();

              case 7:
                newServer = _context.sent;

                console.log(newServer);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createServer() {
        return _ref.apply(this, arguments);
      }

      return createServer;
    }()
  },
  mounted: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var res;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return fetch('/api/server');

            case 2:
              res = _context2.sent;
              _context2.next = 5;
              return res.json();

            case 5:
              this.servers = _context2.sent;

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function mounted() {
      return _ref2.apply(this, arguments);
    }

    return mounted;
  }()
};
Vue.createApp(app).mount('#app');