def _simple_rule_impl(ctx):
    print("HELLO WORLD")

simple_rule = rule(
    implementation = _simple_rule_impl
)

