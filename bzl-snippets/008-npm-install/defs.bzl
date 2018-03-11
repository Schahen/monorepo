BUILD_BAZEL_CONTENTS = """
package(default_visibility = ["//visibility:public"])

exports_files([
  "npm.sh",
])
"""

def _run_rule_impl(ctx):
  output = ctx.outputs.out

  ctx.actions.run_shell(
    inputs=ctx.files.input,
    outputs=[output],
    command="npm install 2>&1 | tee {}".format(output.path)
  )



run = rule(
  implementation=_run_rule_impl,
  outputs={"out": "%{name}.log"},
  attrs = {
      #"outputs"={"out": "%{name}.size"},
      "script": attr.label(allow_files=True, executable=True, cfg="host"),
      "input": attr.label_list(default=[], allow_files=True),
  }
)


def _my_repo_rule_impl(repository_ctx):
  repository_ctx.symlink("package.json", repository_ctx.path("package.json"))
  repository_ctx.file("npm.sh", content="npm install", executable=True)
  repository_ctx.file("BUILD.bazel", content = BUILD_BAZEL_CONTENTS)

my_repo_rule = repository_rule(
    implementation = _my_repo_rule_impl,
    attrs = {
        "ping_message": attr.string(default="PING PING PING")
    }
)

def init_repo_rules():
  my_repo_rule(name="from_repo")
