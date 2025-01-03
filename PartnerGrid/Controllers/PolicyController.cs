using Microsoft.AspNetCore.Mvc;
using PartnerGrid.Databases;
using PartnerGrid.Interfaces;
using PartnerGrid.Models;

namespace PartnerGrid.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PolicyController : ControllerBase
    {
        private readonly IPolicyRepository _policyRepository;

        public PolicyController(IPolicyRepository policyRepository)
        {
            _policyRepository = policyRepository;
        }


        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetAll()
        {
            var policies = await _policyRepository.GetAllAsync();
            return Ok(policies);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var policies = await _policyRepository.GetPoliciesByPartnerIdAsync(id);
            if (policies == null || !policies.Any())
            {
                return NotFound(new { Message = $"Policy with ID {id} not found." });
            }
            return Ok(policies);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PolicyModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newPolicyId = await _policyRepository.CreateAsync(model);
            return CreatedAtAction(nameof(GetById), new { id = newPolicyId }, model);
        }

        [HttpGet("partner/{partnerId}")] 
        public async Task<IActionResult> GetPoliciesByPartnerId(int partnerId)
        {            
            var policies = await _policyRepository.GetPoliciesByPartnerIdAsync(partnerId);

            if (policies == null || !policies.Any())
            {
                return NotFound(new { Message = $"No policies found for Partner ID {partnerId}." });
            }

            return Ok(policies);
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> Update(int id, [FromBody] PolicyModel model)
        //{
        //    if (id != model.PolicyId)
        //    {
        //        return BadRequest(new { Message = "Policy ID mismatch." });
        //    }

        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var existingPolicy = await _policyRepository.GetPoliciesByPartnerIdAsync(id);
        //    if (existingPolicy == null)
        //    {
        //        return NotFound(new { Message = $"Policy with ID {id} not found." });
        //    }

        //    await _policyRepository.UpdateAsync(model);
        //    return NoContent();
        //}


        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(int id)
        //{
        //    var existingPolicy = await _policyRepository.GetByIdAsync(id);
        //    if (existingPolicy == null)
        //    {
        //        return NotFound(new { Message = $"Policy with ID {id} not found." });
        //    }

        //    await _policyRepository.DeleteAsync(id);
        //    return NoContent();
        //}
    }
}
