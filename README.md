```
            _           _                             _                   _                   
  ___  __ _| |       __| |_   _ _ __   __ _ _ __ ___ (_) ___    __      _| |__   ___ _ __ ___ 
 / __|/ _` | |_____ / _` | | | | '_ \ / _` | '_ ` _ \| |/ __|___\ \ /\ / / '_ \ / _ \ '__/ _ \
 \__ \ (_| | |_____| (_| | |_| | | | | (_| | | | | | | | (_|_____\ V  V /| | | |  __/ | |  __/
 |___/\__, |_|      \__,_|\__, |_| |_|\__,_|_| |_| |_|_|\___|     \_/\_/ |_| |_|\___|_|  \___|
         |_|              |___/                                                               
                                     
```

Dynamically handle multiple WHERE clauses in your SQL statements

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
pip install foobar
```

## Usage

```python
import foobar

# returns 'words'
foobar.pluralize('word')

# returns 'geese'
foobar.pluralize('goose')

# returns 'phenomenon'
foobar.singularize('phenomena')
```

## License

[MIT](https://choosealicense.com/licenses/mit/)