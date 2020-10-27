Feature: Site

  Scenario: Scaffold
    When the project is scaffolded
    Then the site is available
    And smoke tests are wired up
