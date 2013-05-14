// to specify one or more environment variables
// export IP=127.0.0.1
// as example, then node polpetta

const
  NUMERIC_ONLY = /^\d+$/,
  IP_ADDRESS = /^(\d+\.){3}\d+$/;

var
  env = process.env,
  os = require('os'),
  arguments = require('just-args'),
  port = arguments.filter(function (arg) {
    return NUMERIC_ONLY.test(arg);
  })[0];

Object.freeze(module.exports = {

  // privileged over IP address, if specified
  HOST_NAME: String(env.HOST_NAME || ''),

  // maximum amount of CPUs to use
  CPU: parseInt(env.CPU || env.CPUS || os.cpus().length, 10),

  // maximum amount of CPUs to use
  SHOW_MEMORY_USAGE: Boolean(env.SHOW_MEMORY_USAGE || false),

  // is specified host to that IP
  IP: String(env.IP || arguments.filter(function (arg) {
    return IP_ADDRESS.test(arg);
  })[0] ||'0.0.0.0'),

  // if specified, tries to launch in that port
  // it fails instantly if the port if manually set
  // it tries for a new port otherwise
  PORT: parseInt(port || env.PORT || 1337, 10),

  // did anyone actually specified a port ?
  PORT_FROM_PEOPLE: port || env.PORT || '',

  // 3 options so far
  //    0 => NO directory listing
  //    1 => QUICK directory listing, no idae what files are
  //    2 => FULL directory listing, the default
  // In full case all file descriptors have stats attached too
  DIRECTORY_LISTING: parseInt(env.DIRECTORY_LISTING || 2, 10),

  // for .njs files, if updated/changed invalidate the cache
  // and require them again (default).
  // Otherwise will keep in cache forever.
  FORCE_NJS_RELOAD: Boolean(env.FORCE_NJS_RELOAD || true),

  // always compress, if possible, deflate/gzip these kind of files
  // valid string woul dbe
  // export COMPRESS=js|css|html|txt|md
  // for intranets applications, this might compromise
  // performance and CPU usage so nothing to compress by default
  COMPRESS: String(env.COMPRESS || '\\x00'),

  // temporary directory
  TMP: String(env.TMP || env.TMPDIR || env.TEMP || os.tmpDir())

});