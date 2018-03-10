BUILD_BAZEL_CONTENTS = """
package(default_visibility = ["//visibility:public"])

exports_files([
  "ping.sh",
])
"""

def _my_repo_rule_impl(repository_ctx):
  repository_ctx.file("ping.sh", content="echo {}".format(repository_ctx.attr.ping_message), executable=True)
  repository_ctx.file("BUILD.bazel", content = BUILD_BAZEL_CONTENTS)

my_repo_rule = repository_rule(
    implementation = _my_repo_rule_impl,
    attrs = {
        "ping_message": attr.string(default="PING PING PING")
    }
)

def init_repo_rules():
  my_repo_rule(name="from_repo")
  my_repo_rule(name="from_repo_with_custom_message", ping_message="PONG PONG PONG")