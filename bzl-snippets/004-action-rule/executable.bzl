

def _impl(ctx):
    args = [ctx.outputs.out.path] + [f.path for f in ctx.files.input]

    ctx.actions.run(
        arguments=args,
        inputs=ctx.files.input,
        outputs=[ctx.outputs.out],
        progress_message="ping to %s" % ctx.outputs.out.short_path,
        executable=ctx.executable._executable
    )


ping = rule(
    implementation=_impl,
    attrs={
        "input": attr.label_list(allow_files=True),
        "out": attr.output(mandatory=True),
        "_executable": attr.label(executable=True, cfg="host", allow_files=True, default=Label("//:mybuild"))
    }
)
