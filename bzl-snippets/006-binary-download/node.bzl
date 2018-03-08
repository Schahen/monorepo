NODEJS_BUILD_BAZEL = """
package(default_visibility = ["//visibility:public"])
exports_files([
  "bin/node",
  "bin/npm",
])

alias(name = "node", actual = "bin/node")
"""


linux = (
"https://nodejs.org/dist/v8.9.4/node-v8.9.4-linux-x64.tar.gz",
"21fb4690e349f82d708ae766def01d7fec1b085ce1f5ab30d9bda8ee126ca8fc",
"node-v8.9.4-linux-x64")

darwin = ("https://nodejs.org/dist/v8.9.4/node-v8.9.4-darwin-x64.tar.gz",
"ca50f7d2035eb805306e303b644bb1cde170ce2615e0a2c6e95fb80881c48c24",
"node-v8.9.4-darwin-x64")

def _install_nodejs_impl(repository_ctx):
  if repository_ctx.os.name.lower().startswith("mac os"):
    (url, sha256, prefix) = darwin
  else:
    (url, sha256, prefix) = linux

  repository_ctx.download_and_extract(
    url = url,
    stripPrefix = prefix,
    sha256 = sha256
  )

  repository_ctx.file("BUILD.bazel", content = NODEJS_BUILD_BAZEL)


install_nodejs = repository_rule(
  _install_nodejs_impl
)

