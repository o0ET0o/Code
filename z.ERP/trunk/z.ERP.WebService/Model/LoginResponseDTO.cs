﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace z.ERP.WebService.Model
{
    public class LoginResponseDTO
    {
        public bool Success
        {
            get;
            set;
        }

        public string ErrorMsg
        {
            get;
            set;
        }

        public string SecretKey
        {
            get;
            set;
        }

        public string UserName
        {
            get;
            set;
        }

    }
}