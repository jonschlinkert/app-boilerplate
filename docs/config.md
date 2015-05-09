## Config API

> Set, get and delete values 

**Set**

Set a value:

```js
app.set('foo', 'bar');
app.set('baz', true);
```

**Get**

Get a value:

```js
app.get('foo');
//=> 'bar'
app.get('baz');
//=> true
```

**Delete**

Delete a value:

```js
app.del('foo');
```


### Config store

> API for persisting and getting values that can be used across projects

The config store persists values to disk. If you want to just get/set values in memory, just use 

**Set**

Set a value:

```js
app.config.set('foo', 'bar');
app.config.set('baz', true);
```

**Get**

Get a value:

```js
app.config.get('foo');
//=> 'bar'
app.config.get('baz');
//=> true
```
