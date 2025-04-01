using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using YourNamespace.Models; // Replace with your actual namespace
using YourNamespace.Data;   // Replace with your actual namespace

namespace YourNamespace.Tests
{
    [TestClass]
    public class AffiliationRepoTest
    {
        private AffiliationRepo _affiliationRepo;
        private Mock<ISCOREContext> MockContext = new Mock<ISCOREContext>();
        private IMapper _mapper;

        [TestInitialize]
        public void Setup()
        {
            var getInMemoryDatabaseContext = new GetInMemoryDatabaseContext();
            var _context = getInMemoryDatabaseContext.GetContext();
            
            if (_mapper == null)
            {
                var mappingConfig = new MapperConfiguration(static mc =>
                {
                    mc.AddProfile(new DomainDtoProfiles());
                });
                _mapper = mappingConfig.CreateMapper();
            }
            
            // Setup mock procedures
            var mockProcedures = new Mock<ISCOREContextProcedures>();
            MockContext.Setup(m => m.Procedures).Returns(mockProcedures.Object);
            
            // Setup default behavior for GetDataAffiliationsAsync
            MockContext.Setup(m => m.Procedures.GetDataAffiliationsAsync(
                It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(),
                It.IsAny<string>(), It.IsAny<string>(), null, default))
                .ReturnsAsync(new List<GetDataAffiliationsResult>());
                
            // Setup specific mock for first test case
            MockContext.Setup(m => m.Procedures.GetDataAffiliationsAsync(
                null, null, "AgentNPN", "CA", "MA", null, default))
                .ReturnsAsync(new List<GetDataAffiliationsResult>());
                
            // Setup specific mock for second test case
            MockContext.Setup(m => m.Procedures.GetDataAffiliationsAsync(
                null, null, "TEST", "TEST", null, null, default))
                .ReturnsAsync(new List<GetDataAffiliationsResult>());
                
            // Setup specific mock for third test case with multiple results
            MockContext.Setup(m => m.Procedures.GetDataAffiliationsAsync(
                null, null, "MULTIPLE", "TEST123", null, null, default))
                .ReturnsAsync(new List<GetDataAffiliationsResult>()
                {
                    new GetDataAffiliationsResult(),
                    new GetDataAffiliationsResult(),
                    new GetDataAffiliationsResult()
                });
            
            _affiliationRepo = new AffiliationRepo(MockContext.Object, _mapper);
        }

        [TestMethod]
        public void GetAffiliationsTest()
        {
            var result = _affiliationRepo.GetAffiliations(new AffiliationSearchDto() { AgentNPN = "AgentNPN", LicenseNbr = "CA", AgentSAN = "MA" });
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void GetAffiliationsWithNoRecordTest()
        {
            var result = _affiliationRepo.GetAffiliations(new AffiliationSearchDto() { AgentNPN = "TEST", LicenseNbr = "TEST" });
            Assert.AreEqual(0, result.Result.Count());
        }

        [TestMethod]
        public void GetAffiliationsWithMultipleResultsTest()
        {
            // Test with parameters that will match our mock returning 3 items
            var result = _affiliationRepo.GetAffiliations(new AffiliationSearchDto() 
            { 
                AgentNPN = "MULTIPLE", 
                LicenseNbr = "TEST123" 
            });
            
            // Assert we get exactly 3 items back
            Assert.AreEqual(3, result.Result.Count());
        }
    }
}
