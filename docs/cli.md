## CLI

> Persist, get and update config values

**Set**

Set a value on `app.config.cache`:

```sh
$ app --set foo=bar
# {config: {cache: {foo: 'bar'}}}

$ app --set baz
# {config: {cache: {baz: true}}}
```
