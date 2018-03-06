def _greeting_rule_impl(ctx):
    print("Hi, {}".format(ctx.attr.whom))

def _farewell_rule_impl(ctx):
    print("Bye, {}".format(ctx.attr.whom))

# https://docs.bazel.build/versions/master/skylark/lib/attr.html
greeting_rule = rule(
    implementation = _greeting_rule_impl,
    attrs = {
        "whom": attr.string(default="anonymous", doc='', mandatory=False),
        "deps": attr.label_list(),
    },
)


farewell_rule = rule(
    implementation = _farewell_rule_impl,
    attrs = {
        "whom": attr.string(default="anonymous", doc='', mandatory=False),
        "you_can_call_this_whatever_you_want_it_still_about_dependencies": attr.label_list(),
    },
)

