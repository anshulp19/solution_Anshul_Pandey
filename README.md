# Gartner take home assignment(Javascript)

### Approach

  - First the array of clicks are read from a file _clicks.json_
  - The above array of clicks are then stored in a map _clicksPeriodMap_ and the count of each IP is stored in _clicksCountMap_
  - _clicksPeriodMap_ stores clicks in a <key, value> pair where value is a click satisfying the requirements mentioned in the assignment. Key is computed as _<IPAddress>#<Date><Hour>_. This ensures the map has unique click for every hour period while offering constatnt time lookup.
  - finnaly the result is saved in _clicksResult_ which is then written in a file _resultset.json_

Constants like input file name and output file name are kept in **config** folder while the function which processes the clicks _getProcessedClick_ is placed under **util** folder.

## Installation
  - run _npm install_ to install the dependencies

## Running the application
  1. Start the application with _npm run solution_
  2. To run the test _npm run test_
## External packages
  - mocha: It's a popular test framework.
  - chai: It's an assertion library that can be easily used with mocha.
