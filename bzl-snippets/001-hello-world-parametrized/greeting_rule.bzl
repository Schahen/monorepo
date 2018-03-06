def _simple_rule_impl(ctx):
    print("Hello, {}".format(ctx.attr.whom))

# https://docs.bazel.build/versions/master/skylark/lib/attr.html
greeting_rule = rule(
    implementation = _simple_rule_impl,
    attrs = {
        "whom": attr.string(default="anonymous", doc='', mandatory=False)
    },
)

