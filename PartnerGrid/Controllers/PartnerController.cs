using Microsoft.AspNetCore.Mvc;
using PartnerGrid.Databases;
using PartnerGrid.Interfaces;
using PartnerGrid.Models;

namespace PartnerGrid.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PartnerController : ControllerBase
    {
        private readonly IRepository<PartnerModel> _partnerRepository;

        public PartnerController (IRepository<PartnerModel> partnerRepository)
        {
            _partnerRepository = partnerRepository;
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetAll()
        {
            var partners = await _partnerRepository.GetAllAsync();
            return Ok(partners);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var partner = await _partnerRepository.GetByIdAsync(id);
            if (partner == null)
            {
                return NotFound(new { Message = $"Partner with ID {id} not found." });
            }
            return Ok(partner);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PartnerModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newPartnerId = await _partnerRepository.CreateAsync(model);
            Console.WriteLine($"Created Partner ID: {newPartnerId}");
            return CreatedAtAction(nameof(GetById), new { id = newPartnerId }, new { id = newPartnerId });
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] PartnerModel model)
        {
            if (id != model.PartnerId)
            {
                return BadRequest(new { Message = "Partner ID mismatch." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingPartner = await _partnerRepository.GetByIdAsync(id);
            if (existingPartner == null)
            {
                return NotFound(new { Message = $"Partner with ID {id} not found." });
            }

            await _partnerRepository.UpdateAsync(model);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existingPartner = await _partnerRepository.GetByIdAsync(id);
            if (existingPartner == null)
            {
                return NotFound(new { Message = $"Partner with ID {id} not found." });
            }

            await _partnerRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
