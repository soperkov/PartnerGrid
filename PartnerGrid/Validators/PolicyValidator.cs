using FluentValidation;
using PartnerGrid.Models;

namespace PartnerGrid.Validators
{
    public class PolicyValidator : AbstractValidator<PolicyModel>
    {
        public PolicyValidator()
        {
            RuleFor(policy => policy.PolicyNumber)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Policy number must not be empty.")
                .Length(10, 15).WithMessage("Policy number must be between 10 and 15 characters.");

            RuleFor(policy => policy.PolicyAmount)
                .GreaterThan(0).WithMessage("Policy amount must be greater than zero.");
        }
    }
}
