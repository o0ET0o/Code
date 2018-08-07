﻿using System;
using z.ERP.WebService.Model;
using z.SSO;
using z.SSO.Model;

namespace z.ERP.WebService.Controllers
{
    public class CommonController : BaseController
    {
        LoginResponseDTO _login(LoginRequestDTO dto)
        {
            var user = service.HomeService.GetUserByCode(dto.userCode, dto.userPassword);
            string LoginStr = ServiceUserHelper.GetSrc(new ServiceUser()
            {
                PlatformId = dto.platformId,
                Id = user.Id,
                Name = user.Name
            });
            UserApplication.Login(LoginStr, null);
            return new LoginResponseDTO()
            {
                success = true,
                secretKey = LoginStr,
                userId = employee.Id,
                userName = employee.Name
            };
        }

        public ResponseDTO Do(RequestDTO dto)
        {
            if (dto == null)
                return new ResponseDTO()
                {
                    Success = false,
                    ErrorMsg = "传入对象为空"
                };
            ServiceTransfer st = new ServiceTransfer();
            return st.Do(dto);
        }

        public LoginResponseDTO Login(LoginRequestDTO dto)
        {
            if (dto == null)
                return new LoginResponseDTO()
                {
                    success = false,
                    errorMsg = "传入对象为空"
                };
            try
            {
                return _login(dto);
            }
            catch (Exception ex)
            {
                return new LoginResponseDTO()
                {
                    success = false,
                    errorMsg = ex.Message
                };
            }
        }
    }
}