## Protobuf HTTP API Cleaner

This tool removes all traces google api annotations from a protocol buffer file.
This is useful to client apps that do not the need the api annotations as those annotations are mostly useful to the server side code.

For example if you had a potocol buffer definition which contains the http api annotation like this:

```proto
syntax = "proto3";


import "google/protobuf/empty.proto";
import "google/api/annotations.proto";


package app;

service AppApi {
  rpc GetConfigInfo(google.protobuf.Empty) returns (ConfigInfoResponse) {
    option (google.api.http) = {
      get: "/v1/configs"
    };
  }
}

message ConfigInfoResponse {
  string some_config = 1;
}
```

and running it through this library binary would produce an output like this:

```proto
syntax = "proto3";


import "google/protobuf/empty.proto";



package app;

service AppApi {
  rpc GetConfigInfo(google.protobuf.Empty) returns (ConfigInfoResponse) {
    
  }
}

message ConfigInfoResponse {
  string some_config = 1;
}
```

### Installation

You can install globally with:
```
  npm i -g proto_api_cleaner
```

or add to your projects package.json by omitting the `-g` in the command above 😉.

### Usage
```
Usage: proto_api_cleaner -p [protoPath] -o [outputPath]

Options:
  --help       Show help                                               [boolean]
  --version    Show version number                                     [boolean]
  -p, --proto  Input path to Protocol Buffer file                     [required]
  -o, --out    Optional path to output converted file or else it overwrites
               input file
```


### Project specific usage: 

The ideal use case is to install it into your client side javascript package.json and then have a script
that runs this binary against your protocol buffer files.


### Contribution
Contributions are welcome. There are bunch of improvements that could be added, such as :

- [ ] Input path should accept a glob input
- [ ] Export cleanup logic as a module that can be used directly in code
- [ ] ... feel free to open suggestion issues

### License
MIT