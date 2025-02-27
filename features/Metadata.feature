Feature: Metadata Processing

  Scenario: Creating a Metadata instance from a valid binary
    Given a valid binary metadata input
    Then it should be an instance of Metadata

  Scenario: Handling invalid binary metadata
    Given an invalid binary metadata input
    Then an InvalidMetadataStructure error should be thrown
