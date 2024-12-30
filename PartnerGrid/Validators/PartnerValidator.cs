using FluentValidation;
using Microsoft.IdentityModel.Tokens;
using PartnerGrid.Models;

namespace PartnerGrid.Validators
{
    public class PartnerValidator : AbstractValidator<PartnerModel>
    {
        public PartnerValidator() 
        {
            RuleFor(partner => partner.FirstName)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("First name must not be empty.")
                .Length(2, 255).WithMessage("First name must be between 2 and 255 characters.");
            
            RuleFor(partner => partner.LastName)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Last name must not be empty.")
                .Length(2, 255).WithMessage("Last name must be between 2 and 255 characters.");

            RuleFor(partner => partner.PartnerNumber)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Partner number must not be empty.")
                .Length(20).WithMessage("Partner must have exactly 20 characters")
                .Matches(@"^\d$").WithMessage("Partner Number must contain only numeric characters.");

            RuleFor(partner => partner.CroatianPin)
                .Cascade(CascadeMode.Stop)
                .Length(11).WithMessage("OIB must have exactly 11 characters.")
                .Matches(@"^\d$").WithMessage("OIB must contain only numeric characters.");

            RuleFor(partner => partner.PartnerTypeId)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Partner Type must not be empty.")
                .InclusiveBetween(1, 2).WithMessage("Partner Type must be 1 - Personal or 2 - Legal.");

            RuleFor(partner => partner.CreateByUser)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("E-mail address must not be empty.")
                .Matches(@"^[^@\s]+@[^@\s]+\.[^@\s]+$").WithMessage("E-mail address must be valid.")
                .Length(1, 255).WithMessage("E-mail address must not exceed 255 characters.");

            RuleFor(partner => partner.IsForeign)
                .NotNull().WithMessage("Partner must be either foreign or local.");

            RuleFor(partner => partner.ExternalCode)
                .Length(10, 20).WithMessage("External code must be between 10 and 20 characters.")
                .Unless(partner => string.IsNullOrEmpty(partner.ExternalCode));

            RuleFor(partner => partner.Gender)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Gender must not be empty.")
                .Must(gender => gender == 'M' || gender == 'F' || gender == 'N').WithMessage("Gender must be 'M', 'F', or 'N'.");

        }
    }
}
