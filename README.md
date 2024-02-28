# eslint-plugin-switch-case-order

Enforce that case labels in switch statements are sorted

## Installation

You'll first need to install [ESLint](https://eslint.org/).

```bash
npm install eslint --save-dev
```

Next, install `eslint-plugin-switch-case-order`.

```bash
npm install eslint-plugin-switch-case-order --save-dev
```

## Configuration

```javascript
{
    "plugins": ["switch-case-order"],
    "rules": {
        "switch-case-order/switch-case-order": [
        "error",
        "asc",
        { natural: true, caseSensitive: true },
      ],
    }
}
```

## Options

### 1st option

`asc` (default) or `desc`

### 2nd option

2nd option is Object with 2 keys.

- `natural`: Default is `true`. If `false`, this rule forces the case labels to be in unnatural order.
  - natural order: `"1"`, `"2"`, `"3"`, `"10"`
  - unnatural order: `"1"`, `"10"`, `"2"`, `"3"`
- `caseSensitive`: Default is `true`. If `false`, this rule forces the case labels to be in case-insensitive order
  - case-sensitive: `"A"`, `"a"`, `"b"`, `"c"`
  - case-insensitive: `"a"`, `"b"`, `"B"`, `"c"`

## Example

### default option

```javascript
// invalid
switch (fruit) {
  case "apple":
    console.log("apple!");
  case "cherry":
    console.log("cherry!");
  case "banana":
    console.log("banana!");
  default:
    console.log("default!");
}

// valid
switch (fruit) {
  case "apple":
    console.log("apple!");
  case "banana":
    console.log("banana!");
  case "cherry":
    console.log("cherry!");
  default:
    console.log("default!");
}
```

### `natural` : true

```javascript
// invalid
switch (fruit) {
  case "1":
    console.log("one!");
  case "10":
    console.log("ten!");
  case "2":
    console.log("two!");
  case "3":
    console.log("three!");
  default:
    console.log("default!");
}

// valid
switch (fruit) {
  case "1":
    console.log("one!");
  case "2":
    console.log("two!");
  case "3":
    console.log("three!");
  case "10":
    console.log("ten!");
  default:
    console.log("default!");
}
```

## Note

In `v1.0.1` (latest), `switch-case-order` only applies when the type of case label is string.

## Acknowledgements

The custom rule `switch-case-order` contains options inspired by [sort-keys](https://eslint.org/docs/latest/rules/sort-keys) rule of ESLint.  
I express my gratitude to the contributors of ESlint and sort-keys for their valuable references in the development of this custom rule.

## License

MIT
