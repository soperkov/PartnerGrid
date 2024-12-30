using PartnerGrid.Databases;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using PartnerGrid.Validators;
using PartnerGrid.Interfaces;
using PartnerGrid.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.OpenApi.Models;

namespace PartnerGrid
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddRazorPages();

            builder.Services.AddSingleton<DapperDbContext>();

            builder.Services.AddControllersWithViews();

            builder.Services.AddScoped<IRepository<PartnerModel>, PartnerRepository>();

            builder.Services.AddScoped<IRepository<PolicyModel>, PolicyRepository>();

            builder.Services.AddValidatorsFromAssemblyContaining<PartnerValidator>();

            builder.Services.AddValidatorsFromAssemblyContaining<PolicyValidator>();

            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngular", policy =>
                    policy.WithOrigins("http://localhost:4200")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
            });

            var app = builder.Build();

            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseCors(policy => policy.AllowAnyHeader());

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }
    }
}
