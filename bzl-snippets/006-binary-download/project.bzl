def _run_script_impl(ctx):

    args = [ctx.files.script[0].path, ctx.outputs.out.path]

    ctx.actions.run(
            arguments=args,
            inputs=ctx.files.input,
            outputs=[ctx.outputs.out],
            progress_message="ping to %s" % ctx.outputs.out.short_path,
            executable=ctx.executable.runner
        )

run_script = rule(
    implementation = _run_script_impl,
    attrs = {
      "input": attr.label_list(allow_files=True),
      "out": attr.output(mandatory=True),
      "script": attr.label(allow_files=True, single_file = True),
      "runner": attr.label(allow_files=True, executable=True, cfg="host"),
    }
)