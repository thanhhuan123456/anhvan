onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);
  };

  $(document).ready(function () {
            var envelope = $("#envelope");
            var btn_open = $("#open");
            var btn_reset = $("#reset");
            var modal = $("#letter-modal");
            var typewriterContainer = $("#typewriter-text");
            var typingTimer;

            var letterLines = [
            "Chúc mừng Ngày Phụ nữ Việt Nam 20/10!",
            "Chúc người đẹp của con luôn mạnh khỏe, luôn trẻ trung xinh đẹp ",
            "Đặc biệt là trong túi lúc nào cũng có tiền và trong lòng có con hẹ hẹ"
        ];


            envelope.click(function () {
                openEnvelope();
            });
            btn_open.click(function () {
                openEnvelope();
            });
            btn_reset.click(function () {
                closeEnvelope();
            });

            $("#close-modal").click(function () {
                closeModal();
            });

            $(".modal-backdrop").click(function () {
                closeModal();
            });

            function openEnvelope() {
                envelope.addClass("open").removeClass("close");
                // Mở modal sau khi envelope mở (0.5s delay)
                setTimeout(function() {
                    showModal();
                }, 500);
            }

            function closeEnvelope() {
                envelope.addClass("close").removeClass("open");
                closeModal();
            }

            function showModal() {
                modal.fadeIn(300);
                startTypewriter();
            }

            function closeModal() {
                modal.fadeOut(300);
                stopTypewriter();
                typewriterContainer.html("");
            }

            function stopTypewriter() {
                if (typingTimer) {
                    clearTimeout(typingTimer);
                    typingTimer = null;
                }
            }

            function startTypewriter() {
                stopTypewriter();
                typewriterContainer.html('<span class="caret"></span>');
                
                var lineIndex = 0;
                var charIndex = 0;
                var currentLine = "";

                function typeNextChar() {
                    if (lineIndex < letterLines.length) {
                        currentLine = letterLines[lineIndex];
                        
                        if (charIndex < currentLine.length) {
                            var char = currentLine.charAt(charIndex);
                            var caretEl = typewriterContainer.find(".caret");
                            caretEl.before(char);
                            charIndex++;
                            
                            var speed = char === ' ' ? 10 : 30 + Math.floor(Math.random() * 20);
                            typingTimer = setTimeout(typeNextChar, speed);
                        } else {
                            // Xong một dòng, thêm <br> và chuyển sang dòng mới
                            var caretEl = typewriterContainer.find(".caret");
                            caretEl.before("<br>");
                            lineIndex++;
                            charIndex = 0;
                            typingTimer = setTimeout(typeNextChar, 200); // Delay giữa các dòng
                        }
                    }
                }

                typeNextChar();
            }

        })