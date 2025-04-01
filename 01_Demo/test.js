MockContext.Setup(static m => m.Procedures.GetDataAffiliationsAsync(
    null,  // licenseStateList - null in your test scenario
    null,  // affiliationStatusList - null in your test scenario
    "AgentNPN",  // AgentNPN from your test
    "CA",   // LicenseNbr from your test
    "MA",   // AgentSAN from your test
    null, default))
    .ReturnsAsync(new List<GetDataAffiliationsResult>() { });  // Return empty list to match expected count of 0



[Test]
public void GetAffiliationsWithMultipleResultsTest()
{
    // First set up the mock to return multiple results
    MockContext.Setup(static m => m.Procedures.GetDataAffiliationsAsync(
        It.IsAny<string>(),
        It.IsAny<string>(),
        "MULTIPLE",  // This is the AgentNPN we'll use in our test
        "TEST123",   // This is the LicenseNbr we'll use in our test
        It.IsAny<string>(),
        null, default))
        .ReturnsAsync(new List<GetDataAffiliationsResult>() 
        { 
            new GetDataAffiliationsResult(),
            new GetDataAffiliationsResult(),
            new GetDataAffiliationsResult() 
        });  // Return 3 items

    // Call the repository method with matching parameters
    var result = _affiliationRepo.GetAffiliations(new AffiliationSearchDto() 
    { 
        AgentNPN = "MULTIPLE", 
        LicenseNbr = "TEST123" 
    });

    // Assert that the result count is 3
    Assert.That(result.Result.Count(), Is.EqualTo(3));
}
