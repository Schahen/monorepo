
def _impl(ctx):
    args = [ctx.outputs.out.path] + [f.path for f in ctx.files.input]
    print(args)

    ctx.actions.run(
        arguments=args,
        inputs=ctx.files._node_modules + ctx.files.input,
        outputs=[ctx.outputs.out],
        progress_message="invoking less compiler",
        executable=ctx.executable._executable
    )


lessc = rule(
    implementation=_impl,
    attrs={
        "_node_modules": attr.label_list(default=["@//:node_modules"]),
        "input": attr.label_list(allow_files=True),
        "out": attr.output(mandatory=True),
        "_executable": attr.label(executable=True, cfg="host", allow_files=True, default=Label("//:lessc_sh"))
    }
)